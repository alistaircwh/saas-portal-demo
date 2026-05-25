"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "How fast do I get my QR code?",
    a: "Your QR code is emailed within minutes of a successful subscription. Most people receive it before they leave the venue. Check your spam folder if it doesn't arrive within 10 minutes.",
  },
  {
    q: "Can I use it on multiple devices?",
    a: "Yes — the Personal plan covers 1 device, the Family plan covers up to 5 devices, and the Business plan covers up to 20. Each device gets its own activation via the same QR code.",
  },
  {
    q: "What if I need help setting up?",
    a: "We offer free setup support via WhatsApp. Just message us after subscribing and our team will walk you through it — typically under 5 minutes.",
  },
  {
    q: "How do I cancel?",
    a: "You can cancel anytime by emailing hello@vigilantasia.com or messaging us on WhatsApp. No cancellation fees. Your protection stays active until the end of your billing period.",
  },
  {
    q: "Is my data private?",
    a: "Vigilant Asia MTD monitors threats at the network and app layer — it does not read your messages, photos, or personal files. Your data never leaves your device. We are fully PDPA compliant.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Common questions</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-muted-foreground text-lg">Everything you need to know before subscribing.</p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <Card className="overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-[var(--dur-fast)] hover:bg-foreground/[0.02]"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-foreground font-medium text-sm md:text-base pr-4">{faq.q}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={cn(
                        "text-primary shrink-0 transition-transform duration-[var(--dur-standard)] ease-[var(--ease-premium)]",
                        isOpen && "rotate-180",
                      )}
                    >
                      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-[var(--dur-standard)] ease-[var(--ease-premium)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                    aria-hidden={!isOpen}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-6 pb-5">
                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
