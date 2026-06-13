import ContactForm from "@/components/ContactForm";
import CheckIcon from "@/components/CheckIcon";
import { MessageSquare, MonitorPlay, CircleHelp, Rocket, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Vigilant Asia MTD",
  description: "Get in touch for a free quote or to find out how Vigilant Asia MTD can protect your business phones. We respond within 1 business day.",
};

const reasons = [
  { Icon: MessageSquare, title: "Get a Free Quote", desc: "Tell us how many phones you need to protect and we'll send you a simple, no-obligation quote." },
  { Icon: MonitorPlay, title: "See a Live Demo", desc: "Watch us detect a real threat on a real phone. It takes 20 minutes and there's no commitment." },
  { Icon: CircleHelp, title: "Ask Us Anything", desc: "Not sure if you need this? Have a specific concern? Just ask, we're happy to chat through it." },
  { Icon: Rocket, title: "Get Set Up Today", desc: "Already decided? We can have your whole team protected within the same business day." },
];

export default function ContactPage() {
  return (
    <div>
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-5">
            <span className="text-primary">Let&apos;s</span> Have a Chat
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl mx-auto">
            No jargon, no pressure. Just a friendly conversation about protecting your business phones.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-light text-foreground mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-light text-foreground mb-6">How We Can Help</h2>
              <div className="space-y-5 mb-10">
                {reasons.map((r) => (
                  <div key={r.title} className="flex gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <r.Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-1">{r.title}</h3>
                      <p className="text-muted-foreground text-sm leading-6">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h3 className="text-foreground font-medium mb-3">What Happens Next</h3>
                <ul className="space-y-2.5">
                  {[
                    "We reply within 1 business day",
                    "A friendly conversation, no sales pressure",
                    "We tailor a recommendation to your business size",
                    "You can try before you commit",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-foreground font-medium mb-2">General Enquiries</h3>
                <p className="text-muted-foreground text-sm leading-6 mb-5">
                  Vigilant Asia is an award-winning Managed Security Service Provider with a CREST accredited and externally validated SOC.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <address className="not-italic space-y-1.5 text-sm text-foreground leading-6">
                    <p className="font-medium">Malaysia</p>
                    <p>Vigilant Asia (M) Sdn Bhd (1255978-D)</p>
                    <p className="text-muted-foreground">No 3, Jalan Astaka U8/82, Bukit Jelutong, 40150 Shah Alam, Selangor, Malaysia.</p>
                  </address>
                  <address className="not-italic space-y-1.5 text-sm text-foreground leading-6">
                    <p className="font-medium">Singapore</p>
                    <p>Vigilant Asia Cybersecurity Pte Ltd</p>
                    <p className="text-muted-foreground">1 Coleman Street, #10-09B, The Adelphi, Singapore 179803.</p>
                  </address>
                </div>

                <div className="border-t border-border mt-5 pt-5 space-y-3 text-sm text-foreground">
                  <p className="flex items-center gap-2.5">
                    <Mail size={16} strokeWidth={1.75} className="text-primary shrink-0" />
                    <a href="mailto:info@vigilantasia.com.my" className="hover:text-primary transition-colors">info@vigilantasia.com.my</a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone size={16} strokeWidth={1.75} className="text-primary shrink-0" />
                    <a href="tel:+60358702252" className="hover:text-primary transition-colors">+60 (3) 58702252</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
