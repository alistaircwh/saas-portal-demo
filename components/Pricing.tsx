"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const tiers = [
  {
    name: "Personal",
    devices: "1 device",
    prices: { 1: 290, 2: 260, 3: 230 },
    features: [
      "1 device protected",
      "Real-time threat detection",
      "Malicious app scanning",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Family",
    devices: "Up to 5 devices",
    prices: { 1: 490, 2: 440, 3: 390 },
    features: [
      "Up to 5 devices",
      "Real-time threat detection",
      "Malicious app scanning",
      "WhatsApp support",
    ],
    popular: true,
  },
  {
    name: "Business",
    devices: "Up to 20 devices",
    prices: { 1: 990, 2: 890, 3: 790 },
    features: [
      "Up to 20 devices",
      "Real-time threat detection",
      "Malicious app + Wi-Fi scanning",
      "Priority WhatsApp support",
    ],
    popular: false,
  },
];

const termOptions: { years: 1 | 2 | 3; label: string; badge?: string }[] = [
  { years: 1, label: "1 Year" },
  { years: 2, label: "2 Years", badge: "Save 10%" },
  { years: 3, label: "3 Years", badge: "Save 21%" },
];

export default function Pricing() {
  const [years, setYears] = useState<1 | 2 | 3>(1);

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Choose the plan that fits you. Longer commitment, lower annual rate.
          </p>

          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-card border border-border">
            {termOptions.map((opt) => (
              <button
                key={opt.years}
                onClick={() => setYears(opt.years)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  years === opt.years
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
                {opt.badge && (
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                      years === opt.years
                        ? "bg-primary-foreground/30 text-primary-foreground"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {opt.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {tiers.map((tier) => {
            const pricePerYear = tier.prices[years];
            const total = pricePerYear * years;

            return (
              <div key={tier.name} className="relative pt-5">
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "h-7 px-4 text-xs font-bold uppercase tracking-wider rounded-full pointer-events-none"
                      )}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <Card
                  className={cn(
                    "flex flex-col h-full p-0",
                    tier.popular && "border-2 border-primary bg-primary/10"
                  )}
                >
                  <CardContent className="flex flex-col flex-1 p-8 gap-0">
                    <div className="mb-6">
                      <h3 className="text-foreground font-bold text-xl mb-4">{tier.name}</h3>
                      <div className="flex items-end gap-1">
                        <span className="text-muted-foreground text-sm">RM</span>
                        <span className="text-4xl font-bold text-foreground">{pricePerYear}</span>
                        <span className="text-muted-foreground text-sm mb-1">/yr</span>
                      </div>
                      <p className="text-muted-foreground text-xs mt-1">
                        {years === 1
                          ? "Billed annually"
                          : `RM ${total} billed every ${years} years`}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="text-primary shrink-0 mt-0.5"
                          >
                            <path
                              d="M3 8l3.5 3.5L13 4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className={cn(
                        tier.popular
                          ? buttonVariants({ variant: "default" })
                          : buttonVariants({ variant: "outline" }),
                        "w-full h-11 text-sm font-semibold"
                      )}
                    >
                      Subscribe Now
                    </a>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
