import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-[#080808]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 60% 20%, #C41E1E 0%, transparent 50%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Trusted by businesses across Asia · Powered by Zimperium
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
            Your phone is already a target.{" "}
            <span className="text-primary">One scan changes that.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Hackers target phones more than computers — and most people don&apos;t know until it&apos;s too late. Vigilant Asia MTD protects you silently in the background. Setup takes less than a minute.
          </p>

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

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
            <span className="text-stone-500 text-xs">Forrester Wave Leader 2024</span>
            <span className="text-stone-600 text-xs">·</span>
            <span className="text-stone-500 text-xs">Used by the U.S. Dept. of Defence</span>
            <span className="text-stone-600 text-xs">·</span>
            <span className="text-stone-500 text-xs">4.4/5 on Gartner</span>
          </div>
        </div>
      </div>
    </section>
  );
}
