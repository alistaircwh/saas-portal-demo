"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { syncUserFromAuth } from "@/lib/auth/sync";

// Gate for the login form. We only email a one-time code to addresses that
// already exist in our `User` table — i.e. customers created by a purchase.
// This is the registration gate: unknown emails are turned away here, before
// any Supabase auth user is minted, so strangers can't self-register by typing
// an email. (Supabase's own `shouldCreateUser` checks `auth.users`, the wrong
// store — a real first-time customer isn't in it yet, so we gate on our table.)
export async function requestLoginCode(
  rawEmail: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = rawEmail.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: "Please enter your email." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    return {
      ok: false,
      error: "We couldn't find an account for that email. Accounts are created when you purchase a plan.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Called from the login form right after the browser verifies the OTP. By then
// the session cookies are set, so the server can re-validate the user and mirror
// them into our `User` table (authId + emailVerifiedAt).
export async function syncCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("syncCurrentUser: no authenticated user");
  }

  await syncUserFromAuth(user);
}
