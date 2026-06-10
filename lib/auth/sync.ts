import type { User as SupabaseUser } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import type { User } from "@/lib/generated/prisma/client";

// Bridges a verified Supabase auth user into our own `User` table.
//
// Customers may already exist in `User` (e.g. a row created at order time with
// authId still null), so we key on the unique email and link `authId` on first
// login. `emailVerifiedAt` is stamped once — on the first OTP verification — and
// preserved thereafter; `lastLoginAt` is refreshed every time.
export async function syncUserFromAuth(authUser: SupabaseUser): Promise<User> {
  const email = authUser.email?.toLowerCase();
  if (!email) {
    throw new Error("syncUserFromAuth: Supabase user has no email");
  }

  const now = new Date();
  const existing = await prisma.user.findUnique({ where: { email } });

  const shared = {
    authId: authUser.id,
    emailVerifiedAt: existing?.emailVerifiedAt ?? now,
    lastLoginAt: now,
  };

  if (existing) {
    return prisma.user.update({ where: { email }, data: shared });
  }

  return prisma.user.create({ data: { email, ...shared } });
}
