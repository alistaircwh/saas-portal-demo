import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Your Account | Vigilant Asia MTD",
};

function formatDate(d: Date | null | undefined) {
  if (!d) return "-";
  return new Intl.DateTimeFormat("en-MY", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const profile = await prisma.user.findUnique({
    where: { email: user.email!.toLowerCase() },
  });
  // A valid session with no `User` row means an unregistered address slipped
  // past the login gate — turn them away rather than render a hollow page.
  if (!profile) redirect("/login?next=/account");

  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || "there";

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Hi, {displayName}</h1>
          <p className="text-stone-400 mt-1">{user.email}</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-4">
            <h2 className="text-lg font-semibold text-white">Account details</h2>
            <dl className="divide-y divide-border">
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="text-foreground">{profile?.email ?? user.email}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-muted-foreground">Account type</dt>
                <dd className="text-foreground capitalize">{profile?.accountType ?? "individual"}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-muted-foreground">Email verified</dt>
                <dd className="text-foreground">{formatDate(profile?.emailVerifiedAt)}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-muted-foreground">Last sign-in</dt>
                <dd className="text-foreground">{formatDate(profile?.lastLoginAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
