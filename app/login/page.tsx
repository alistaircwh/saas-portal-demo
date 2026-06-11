import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Vigilant Asia MTD",
  description: "Sign in to manage your Vigilant Asia subscription and licenses.",
};

// Only allow internal redirect targets to avoid an open-redirect via ?next=.
function safeNext(next: string | undefined): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/account";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; reason?: string }>;
}) {
  const { next, reason } = await searchParams;
  const target = safeNext(next);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(target);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#130E0E] via-[#0D0A0A] to-[#0A0808] py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-stone-400">Sign in to manage your subscription and licenses.</p>
        </div>
        {reason === "timeout" && (
          <p className="mb-4 text-sm text-stone-300 bg-card/60 border border-border rounded-md px-4 py-3 text-center">
            You were signed out after a period of inactivity. Please sign in again.
          </p>
        )}
        <LoginForm next={target} />
      </div>
    </section>
  );
}
