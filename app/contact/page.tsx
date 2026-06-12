import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Vigilant Asia MTD",
  description: "Get in touch for a free quote or to find out how Vigilant Asia MTD can protect your business phones. We respond within 1 business day.",
};

const reasons = [
  { icon: "💬", title: "Get a Free Quote", desc: "Tell us how many phones you need to protect and we'll send you a simple, no-obligation quote." },
  { icon: "🖥️", title: "See a Live Demo", desc: "Watch us detect a real threat on a real phone. It takes 20 minutes and there's no commitment." },
  { icon: "❓", title: "Ask Us Anything", desc: "Not sure if you need this? Have a specific concern? Just ask, we're happy to chat through it." },
  { icon: "🚀", title: "Get Set Up Today", desc: "Already decided? We can have your whole team protected within the same business day." },
];

export default function ContactPage() {
  return (
    <div>
      <section className="py-24 bg-gradient-to-br from-[#130E0E] via-[#0D0A0A] to-[#0A0808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Let&apos;s Have a Chat
          </h1>
          <p className="text-stone-300 text-xl max-w-xl mx-auto">
            No jargon, no pressure. Just a friendly conversation about protecting your business phones.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">How We Can Help</h2>
              <div className="space-y-5 mb-10">
                {reasons.map((r) => (
                  <div key={r.title} className="flex gap-4 bg-[#130E0E] border border-white/10 rounded-xl p-5 hover:border-[#C41E1E]/30 transition-colors">
                    <div className="text-2xl">{r.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{r.title}</h3>
                      <p className="text-stone-400 text-sm leading-6">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#130E0E] border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-white font-semibold mb-3">What Happens Next</h3>
                <ul className="space-y-2.5">
                  {[
                    "We reply within 1 business day",
                    "A friendly conversation, no sales pressure",
                    "We tailor a recommendation to your business size",
                    "You can try before you commit",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-stone-300">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#130E0E] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">General Enquiries</h3>
                <p className="text-stone-400 text-sm leading-6 mb-5">
                  Vigilant Asia is an award-winning Managed Security Service Provider with a CREST accredited and externally validated SOC.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <address className="not-italic space-y-1.5 text-sm text-stone-300 leading-6">
                    <p className="text-white font-medium">Malaysia</p>
                    <p>Vigilant Asia (M) Sdn Bhd (1255978-D)</p>
                    <p className="text-stone-400">No 3, Jalan Astaka U8/82, Bukit Jelutong, 40150 Shah Alam, Selangor, Malaysia.</p>
                  </address>
                  <address className="not-italic space-y-1.5 text-sm text-stone-300 leading-6">
                    <p className="text-white font-medium">Singapore</p>
                    <p>Vigilant Asia Cybersecurity Pte Ltd</p>
                    <p className="text-stone-400">1 Coleman Street, #10-09B, The Adelphi, Singapore 179803.</p>
                  </address>
                </div>

                <div className="border-t border-white/10 mt-5 pt-5 space-y-3 text-sm text-stone-300">
                  <p className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@vigilantasia.com.my" className="hover:text-primary transition-colors">info@vigilantasia.com.my</a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
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
