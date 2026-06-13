import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section id="cta" className="va-divider-top py-24 md:py-28 bg-background">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-surface-dark-border bg-surface-dark px-6 py-16 text-center sm:px-12 md:py-20">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 0%, rgba(230,51,41,0.14), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-light text-surface-dark-foreground mb-5 text-balance">
                <span className="text-primary">Don&apos;t</span> wait until it&apos;s too late
              </h2>
              <p className="text-surface-dark-muted text-lg leading-relaxed mb-8 text-pretty">
                Cybercriminals target smartphones because they know how much lives on them. Protect your
                device, your accounts, and your business, and stay one step ahead of mobile threats.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#pricing"
                  className={cn(buttonVariants({ variant: "default" }), "h-12 px-8 text-base font-medium")}
                >
                  Protect my device now
                </a>
                <a
                  href="#contact"
                  className={cn(buttonVariants({ variant: "outline" }), "h-12 px-8 text-base font-medium")}
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
