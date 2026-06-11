import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import ThreatVisual from "@/components/ThreatVisual";

const trustSignals = [
  "Forrester Wave Leader 2024",
  "Used by the U.S. Dept. of Defence",
  "4.4/5 on Gartner",
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-[#080808]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #C41E1E 0%, transparent 55%)",
          backgroundSize: "90% 90%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "70% 25%",
          opacity: 0.22,
          animation: "va-glow-drift 12s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="max-w-xl">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Trusted by businesses across Malaysia · Powered by Zimperium
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 text-balance">
                Everything important is on your phone.
                <br />
                <span className="text-primary">Make sure only you can access it.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl text-pretty">
                Hackers target phones more than computers, and most people don&apos;t know until it&apos;s too late. Vigilant Asia MTD protects you silently in the background. Setup takes less than a minute.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pricing"
                  className={cn(buttonVariants({ variant: "default" }), "h-11 px-6 text-sm font-semibold")}
                >
                  Subscribe Now
                </a>
                <a
                  href="#how-it-works"
                  className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 text-sm font-semibold")}
                >
                  See How It Works
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/[0.06] pt-6">
                {trustSignals.map((signal, i) => (
                  <span key={signal} className="flex items-center gap-3">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-stone-700" />}
                    <span className="text-stone-500 text-xs">{signal}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={260} className="hidden lg:block">
            <ThreatVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
