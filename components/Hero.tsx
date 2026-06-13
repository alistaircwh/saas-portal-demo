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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #e63329 0%, transparent 65%)",
          backgroundSize: "90% 90%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "70% 25%",
          opacity: 0.08,
          animation: "va-glow-drift 12s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="max-w-xl">
            <Reveal delay={0}>
              <div className="va-overline mb-6 text-xs text-muted-foreground">
                Trusted across Malaysia · Powered by Zimperium
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] mb-6 text-balance">
                <span className="text-primary">Everything</span> important is on your phone. Make sure only you can access it.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md text-pretty">
                Hackers target phones more than computers, and most people don&apos;t know until it&apos;s too late. Vigilant Asia MTD protects you silently in the background. Setup takes less than a minute.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pricing"
                  className={cn(buttonVariants({ variant: "default" }), "h-11 px-6 text-sm font-medium")}
                >
                  Subscribe Now
                </a>
                <a
                  href="#how-it-works"
                  className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 text-sm font-medium")}
                >
                  See How It Works
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6">
                {trustSignals.map((signal, i) => (
                  <span key={signal} className="flex items-center gap-3">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />}
                    <span className="text-muted-foreground text-xs">{signal}</span>
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
