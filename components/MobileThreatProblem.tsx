import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const threats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M4 4h16c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H9l-5 4V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "SMS & WhatsApp scams",
    description: "Malicious links and phishing attempts sent through messaging apps.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 7v4M12 13.5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Malicious apps",
    description: "Unsafe applications that steal information or compromise your device.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M2 8.5C5 6 8.5 4.5 12 4.5S19 6 22 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 12c2-1.8 4.4-2.8 7-2.8s5 1 7 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 15.5c1.1-1 2.5-1.6 4-1.6s2.9.6 4 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 19v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Unsafe Wi-Fi networks",
    description: "Risky networks that could expose your data to attackers.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M12 2l8 3v6c0 5-3.4 8.4-8 11-4.6-2.6-8-6-8-11V5l8-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Device compromise",
    description: "Signs of rooting, jailbreaking, or suspicious device activity.",
  },
];

export default function MobileThreatProblem() {
  return (
    <section id="threats" className="va-divider-top py-24 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="The threat"
          title="Your phone is now the #1 target for cybercriminals"
          subtitle="It holds your most valuable personal and business data, which is exactly why attackers target it. Vigilant Asia MTD stops these threats before they reach your accounts or device."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {threats.map((t, i) => (
            <Reveal key={t.title} delay={i * 60} className="h-full">
              <Card className="bg-background h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
                    {t.icon}
                  </div>
                  <h3 className="text-foreground font-semibold text-base mb-2">{t.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
