"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { requestLoginCode, syncCurrentUser } from "./actions";

type Step = "email" | "code";
type Status = "idle" | "working";

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin -ml-0.5 mr-2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginForm({ next }: { next: string }) {
  const [supabase] = useState(() => createClient());

  const [step, setStep] = useState<Step>("email");
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("working");
    // Gated server-side: only emails already in our `User` table get a code.
    const result = await requestLoginCode(email);
    setStatus("idle");
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setStep("code");
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("working");
    const addr = email.trim().toLowerCase();
    const token = code.trim();
    // Returning users get an "email" OTP; a first-time signup gets a "signup"
    // token. Try the common case, then fall back so both work in one UI.
    let { error } = await supabase.auth.verifyOtp({ email: addr, token, type: "email" });
    if (error) {
      ({ error } = await supabase.auth.verifyOtp({ email: addr, token, type: "signup" }));
    }
    if (error) {
      setStatus("idle");
      setError(error.message);
      return;
    }
    // Session cookies are now set — mirror the user into our DB, then enter the app.
    try {
      await syncCurrentUser();
    } catch {
      setStatus("idle");
      setError("Signed in, but we couldn't load your profile. Please try again.");
      return;
    }
    // Hard navigation: guarantees the server re-reads the new session cookie and
    // avoids an RSC router race between replace() and refresh() that can leave
    // the user stuck on this step.
    window.location.assign(next);
  };

  return (
    <Card>
      <CardContent className="p-8">
        {step === "email" ? (
          <form onSubmit={sendCode} className="space-y-5">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-1.5">Email</label>
              <Input
                type="email"
                name="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-10"
              />
              <p className="text-muted-foreground text-xs mt-2">
                We&apos;ll email you a one-time code, no password needed.
              </p>
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" disabled={status === "working"} className="w-full h-11 text-sm font-semibold">
              {status === "working" ? (
                <>
                  <Spinner />
                  Sending code...
                </>
              ) : (
                "Send code"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-5">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-1.5">Enter your code</label>
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                name="code"
                required
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="h-10 tracking-[0.3em] text-center"
              />
              <p className="text-muted-foreground text-xs mt-2">
                Sent to <span className="text-foreground/80">{email}</span>.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setError(null);
                  }}
                  className="text-primary hover:underline"
                >
                  Use a different email
                </button>
              </p>
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" disabled={status === "working"} className="w-full h-11 text-sm font-semibold">
              {status === "working" ? (
                <>
                  <Spinner />
                  Verifying...
                </>
              ) : (
                "Verify & continue"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
