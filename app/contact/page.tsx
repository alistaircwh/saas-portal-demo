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

              <div className="bg-[#130E0E] border border-white/10 rounded-xl p-6">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
