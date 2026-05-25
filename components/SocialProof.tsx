import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";

const stats = [
  { value: "2,000+", label: "Users protected" },
  { value: "<60s", label: "Average setup time" },
  { value: "99.9%", label: "Uptime guarantee" },
];

const testimonials = [
  {
    quote: "I scanned the QR code after the talk and was protected before I even left the room. Easiest security tool I've ever used.",
    name: "Ahmad Farizal",
    role: "SME Owner, Kuala Lumpur",
  },
  {
    quote: "The QR code arrived in under 5 minutes. I set it up on my whole family's phones the same evening.",
    name: "Priya Nair",
    role: "Parent & HR Manager, Penang",
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted across Malaysia</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Join thousands of people who decided to act on the day they heard the pitch.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-14">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60} className="h-full">
              <Card className="bg-background h-full">
                <CardContent className="text-center p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <Card className="bg-background h-full">
                <CardContent className="p-8">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="text-primary/40 mb-4">
                    <path d="M0 20V12C0 5.373 4.477 1.12 13.43 0l1.14 2.08C10.19 3.04 8 5.707 8 10h6v10H0zm16 0V12C16 5.373 20.477 1.12 29.43 0l1.14 2.08C26.19 3.04 24 5.707 24 10h6v10H16z" fill="currentColor" />
                  </svg>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="text-foreground font-semibold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
