import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";

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
    description: "Pick the tier that fits you — Personal, Family, or Business. No hidden fees, no complicated setup.",
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
    description: "Within minutes of subscribing, your personalised QR code lands in your inbox — ready to use.",
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
    description: "Open your phone camera, scan the QR code, and Vigilant Asia MTD activates instantly — no IT team needed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How it works</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three steps from payment to protected. That&apos;s it.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 80} className="h-full">
              <Card className="bg-background h-full">
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
                    {step.icon}
                  </div>
                  <span className="text-primary font-bold text-sm tracking-widest mb-2">{step.number}</span>
                  <h3 className="text-foreground font-semibold text-lg mb-3">{step.title}</h3>
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
