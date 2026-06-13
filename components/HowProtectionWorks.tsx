import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Monitor",
    description: "Continuously watches your device, apps, network connections, and web activity.",
  },
  {
    number: "02",
    title: "Analyse",
    description: "Machine learning examines activity for signs of phishing, malware, or device compromise.",
  },
  {
    number: "03",
    title: "Detect",
    description: "Threats are identified in real time, including previously unknown attacks.",
  },
  {
    number: "04",
    title: "Protect",
    description: "You get an immediate alert and clear guidance, so you can act before any damage is done.",
  },
];

const flow = [
  "Suspicious SMS received",
  "Malicious link identified",
  "Threat alert displayed",
  "You're stopped before tapping",
  "Device stays protected",
];

export default function HowProtectionWorks() {
  return (
    <section id="how-protection-works" className="va-divider-top py-24 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Protection that works around the clock"
          subtitle="Vigilant Asia MTD watches your device in real time. The moment something looks wrong, it evaluates the threat and warns you before damage can occur."
          className="mb-16"
        />

        <ol className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6 mb-20">
          {/* Connecting line behind the nodes on desktop */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 90} as="li" className="relative">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background font-mono font-light text-primary shadow-[0_0_0_6px_var(--color-background)]">
                  {step.number}
                </span>
                <h3 className="text-foreground font-medium text-lg lg:mt-5">{step.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed lg:pr-4">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="max-w-3xl mx-auto rounded-lg border border-border bg-secondary/50 p-8">
            <h3 className="text-center text-foreground font-medium text-lg mb-6">
              See a threat before it becomes an incident
            </h3>
            <ol className="flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-3">
              {flow.map((step, i) => (
                <li key={step} className="flex items-center gap-3 sm:flex-col sm:gap-2 sm:flex-1 sm:min-w-[120px]">
                  <span
                    className="flex-1 sm:flex-none sm:w-full text-center rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground"
                    style={{
                      animation: `va-flow-pulse ${flow.length * 0.9}s var(--ease-premium) infinite`,
                      animationDelay: `${i * 0.9}s`,
                    }}
                  >
                    {step}
                  </span>
                  {i < flow.length - 1 && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 rotate-90 text-foreground/25 sm:rotate-0"
                      style={{
                        animation: `va-flow-arrow ${flow.length * 0.9}s var(--ease-premium) infinite`,
                        animationDelay: `${i * 0.9 + 0.45}s`,
                      }}
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
