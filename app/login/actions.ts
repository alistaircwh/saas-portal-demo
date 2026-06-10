"use server";

import { createClient } from "@/lib/supabase/server";
import { syncUserFromAuth } from "@/lib/auth/sync";

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
