import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

// Routes that require an authenticated session. Unauthenticated visitors are
// bounced to /login with a ?next= param so they return here after signing in.
const PROTECTED_PREFIXES = ["/account"];

// App-level session timeouts. Supabase refresh tokens don't expire by default,
// so without this an active session renews forever. We track two stamps in our
// own cookies and end the session when either window is exceeded:
//   - idle:     no activity for IDLE_TIMEOUT_MS (refreshed every request)
//   - absolute: session older than ABSOLUTE_TIMEOUT_MS regardless of activity
// (Supabase's built-in inactivity/time-box controls are Pro-plan only.)
const IDLE_TIMEOUT_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
const ABSOLUTE_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const SESSION_START_COOKIE = "va_sess_start";
const SESSION_SEEN_COOKIE = "va_sess_seen";

// Cookies outlive the logical windows so the timestamp comparison — not cookie
// expiry — is the single source of truth for when a session ends.
const SESSION_COOKIE_MAX_AGE_S = 60 * 24 * 60 * 60; // 60 days

function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE_S,
  };
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Refreshes the auth token and re-validates it with Supabase. Keep this call
  // immediately after creating the client and before any redirect logic.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (user) {
    const now = Date.now();
    const start = Number(request.cookies.get(SESSION_START_COOKIE)?.value);
    const seen = Number(request.cookies.get(SESSION_SEEN_COOKIE)?.value);

    const expiredAbsolute = Number.isFinite(start) && now - start > ABSOLUTE_TIMEOUT_MS;
    // Once a session has started, a missing/stale "seen" stamp both mean idle.
    const expiredIdle =
      Number.isFinite(start) && (!Number.isFinite(seen) || now - seen > IDLE_TIMEOUT_MS);

    if (expiredAbsolute || expiredIdle) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Network hiccup revoking the token — we still clear cookies below.
      }
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("reason", "timeout");
      if (isProtected) url.searchParams.set("next", pathname);
      const redirect = NextResponse.redirect(url);
      // Carry over Supabase's sign-out cookie clears, then drop our stamps.
      supabaseResponse.cookies.getAll().forEach((c) => redirect.cookies.set(c));
      redirect.cookies.delete(SESSION_START_COOKIE);
      redirect.cookies.delete(SESSION_SEEN_COOKIE);
      return redirect;
    }

    // Stamp the start on first sight; refresh "seen" on every request.
    if (!Number.isFinite(start)) {
      supabaseResponse.cookies.set(SESSION_START_COOKIE, String(now), sessionCookieOptions());
    }
    supabaseResponse.cookies.set(SESSION_SEEN_COOKIE, String(now), sessionCookieOptions());
  }

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
