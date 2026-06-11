import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section id="cta" className="va-divider-top py-24 md:py-28 bg-card">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-[#1A0D0D] to-[#0D0A0A] px-6 py-16 text-center sm:px-12 md:py-20 shadow-[0_40px_100px_-50px_rgba(196,30,30,0.6)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 0%, rgba(196,30,30,0.35), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight text-balance">
                Don&apos;t wait until it&apos;s too late
              </h2>
              <p className="text-stone-300 text-lg leading-relaxed mb-8 text-pretty">
                Cybercriminals target smartphones because they know how much lives on them. Protect your
                device, your accounts, and your business, and stay one step ahead of mobile threats.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#pricing"
                  className={cn(buttonVariants({ variant: "default" }), "h-12 px-8 text-base font-semibold")}
                >
                  Protect my device now
                </a>
                <a
                  href="#contact"
                  className={cn(buttonVariants({ variant: "outline" }), "h-12 px-8 text-base font-semibold")}
                >
                  Talk to us first
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
