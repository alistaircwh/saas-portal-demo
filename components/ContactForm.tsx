"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

const selectClass =
  "w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-2 text-sm text-foreground transition-[color,background-color,border-color,box-shadow,--tw-ring-color] duration-[var(--dur-fast)] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 h-10 appearance-none";

const textareaClass =
  "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-[color,background-color,border-color,box-shadow,--tw-ring-color] duration-[var(--dur-fast)] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    devices: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setState("success");
        setForm({ name: "", email: "", company: "", devices: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <Card className="border-primary/30 bg-primary/5 animate-in fade-in-0 slide-in-from-bottom-2 duration-[var(--dur-standard)]">
        <CardContent className="p-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 border border-primary/30">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M7 14.5l4.5 4.5L21 9.5"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="va-check-path"
                />
              </svg>
            </span>
          </div>
          <h3 className="text-foreground text-xl font-bold mb-2">Message Received</h3>
          <p className="text-muted-foreground">We&apos;ll be in touch within 1 business day with a tailored quote.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-1.5">Full Name *</label>
              <Input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-1.5">Work Email *</label>
              <Input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-1.5">Company *</label>
              <Input
                type="text"
                name="company"
                required
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="h-10"
              />
            </div>
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-1.5">How Many Phones to Protect?</label>
              <select
                name="devices"
                value={form.devices}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select range</option>
                <option value="1-50">1 – 50 devices</option>
                <option value="51-100">51 – 100 devices</option>
                <option value="101-500">101 – 500 devices</option>
                <option value="501-1000">501 – 1,000 devices</option>
                <option value="1000+">1,000+ devices</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-foreground/80 text-sm font-medium mb-1.5">Anything Else We Should Know?</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="e.g. We have 15 staff phones, mix of iPhones and Android. Want to know pricing and how setup works."
              className={textareaClass}
            />
          </div>

          {state === "error" && (
            <p className="text-destructive text-sm">Something went wrong. Please try again or email us directly.</p>
          )}

          <Button
            type="submit"
            disabled={state === "submitting"}
            className={cn("w-full h-11 text-sm font-semibold")}
          >
            {state === "submitting" ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="animate-spin -ml-0.5 mr-2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
