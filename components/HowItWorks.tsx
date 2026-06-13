import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    number: "01",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 8h4M7 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Choose your plan",
    description: "Pick the tier that fits you: Personal, Family, or Business. No hidden fees, no complicated setup.",
  },
  {
    number: "02",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "We email your QR code",
    description: "Within minutes of subscribing, your personalised QR code lands in your inbox, ready to use.",
  },
  {
    number: "03",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 7h6M9 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Scan and you're protected",
    description: "Open your phone camera, scan the QR code, and Vigilant Asia MTD activates instantly, no IT team needed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="va-divider-top py-24 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Getting started"
          title="From payment to protected in three steps"
          subtitle="No IT team, no complicated setup. That's it."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 80} className="h-full">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    {step.icon}
                  </div>
                  <span className="va-overline text-primary text-sm mb-2">{step.number}</span>
                  <h3 className="text-foreground font-medium text-lg mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
