import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const personas = [
  {
    title: "Business owners",
    description: "Protect access to business accounts, customer information, and sensitive communications.",
  },
  {
    title: "Directors & executives",
    description: "Reduce the risk of targeted attacks aimed at leadership teams.",
  },
  {
    title: "Sales & field teams",
    description: "Stay protected while travelling and connecting from multiple locations.",
  },
  {
    title: "Remote workers",
    description: "Secure mobile access to email, collaboration tools, and business apps.",
  },
];

export default function WhoIsThisFor() {
  return (
    <section id="who-its-for" className="va-divider-top py-24 md:py-28 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for modern professionals and business owners"
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {personas.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className="h-full">
              <Card className="bg-card h-full">
                <CardContent className="flex gap-5 p-6">
                  <span className="font-mono text-sm font-semibold text-primary/70 tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-foreground font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
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
