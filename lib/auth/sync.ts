import type { User as SupabaseUser } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import type { User } from "@/lib/generated/prisma/client";

// Bridges a verified Supabase auth user into our own `User` table.
//
// Customers must already exist in `User` (a row created when they purchase, with
// authId still null) — login does NOT create accounts. We key on the unique
// email and link `authId` on first login. `emailVerifiedAt` is stamped once — on
// the first OTP verification — and preserved thereafter; `lastLoginAt` is
// refreshed every time. If no row exists we throw: the login form already gates
// unknown emails (see requestLoginCode), and this is the backstop in case a
// valid Supabase session is obtained for an unregistered address.
export async function syncUserFromAuth(authUser: SupabaseUser): Promise<User> {
  const email = authUser.email?.toLowerCase();
  if (!email) {
    throw new Error("syncUserFromAuth: Supabase user has no email");
  }

  const now = new Date();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    throw new Error(`syncUserFromAuth: no registered account for ${email}`);
  }

  return prisma.user.update({
    where: { email },
    data: {
      authId: authUser.id,
      emailVerifiedAt: existing.emailVerifiedAt ?? now,
      lastLoginAt: now,
    },
  });
}
