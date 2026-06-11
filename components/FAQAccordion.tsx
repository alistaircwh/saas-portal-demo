"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  {
    q: "Does Mobile Threat Defence work on iPhone and Android devices?",
    a: "Absolutely! Whether you're on iPhone or Android, you're fully covered no matter which device your team or family uses.",
  },
  {
    q: "Will it slow down my phone?",
    a: "Not at all! The app is engineered to run quietly in the background without draining your battery or slowing anything down. You won't even notice it's there.",
  },
  {
    q: "Can it read my personal messages?",
    a: "No way! The app focuses entirely on detecting threats. Your personal messages, photos, and files are completely off-limits. Your privacy is always protected.",
  },
  {
    q: "Do I need to keep the app open?",
    a: "Nope! Once it's installed, protection runs automatically in the background 24/7. No babysitting required. Set it and forget it!",
  },
  {
    q: "What happens if a threat is detected?",
    a: "You'll get an instant alert that explains exactly what was detected and what to do next. It's clear, calm, and actionable. You'll always know you're in good hands!",
  },
  {
    q: "Can I use it for personal and business devices?",
    a: "Absolutely! Whether it's your personal phone or a company device, you're covered. Our Family and Business plans make it easy to protect everyone at once, and great value too!",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="va-divider-top py-24 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          subtitle="Everything you need to know about the app and getting started."
          className="mb-14"
        />

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
