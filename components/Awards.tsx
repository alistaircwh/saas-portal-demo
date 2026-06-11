import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

type Icon = React.ComponentType<{ className?: string }>;

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22">
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 17h6M10 17l.5-3h3l.5 3M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22">
      <path d="M12 2l8 3v6c0 5-3.4 8.4-8 11-4.6-2.6-8-6-8-11V5l8-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22">
      <path d="M4 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16M13 21V10h6a1 1 0 0 1 1 1v10M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 8h2M7 12h2M17 14h0M17 17h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22">
      <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function RibbonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22">
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5M9.5 9l1.7 1.7L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22">
      <path d="M3 17l5-5 4 4 8-8M15 8h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const awards: { Icon: Icon; title: string; detail: string }[] = [
  {
    Icon: TrophyIcon,
    title: "#1 Ranked by Forrester",
    detail: "Named the top mobile security solution across 11 competing vendors, evaluated on 22 independent criteria (Forrester Wave, Q3 2024).",
  },
  {
    Icon: ShieldIcon,
    title: "Used by the U.S. Department of Defence",
    detail: "The first mobile security vendor to receive FedRAMP authorisation, the standard required to operate inside U.S. federal government systems.",
  },
  {
    Icon: BuildingIcon,
    title: "Trusted by the World's Biggest Names",
    detail: "Microsoft, two of the world's largest airlines, two leading car manufacturers, and one of the world's biggest oil producers all rely on this protection.",
  },
  {
    Icon: StarIcon,
    title: "4.4/5 on Gartner Peer Insights",
    detail: "Rated 4.4 out of 5 by 58 verified enterprise customers on Gartner Peer Insights, one of the most trusted independent software review platforms.",
  },
  {
    Icon: RibbonIcon,
    title: "Mobile Security Solution of the Year",
    detail: "Winner of the 2025 Mobile Breakthrough Award for Best Mobile Security Solution, recognised globally for protecting real businesses from real threats.",
  },
  {
    Icon: TrendIcon,
    title: "Backed by World-Class Investors",
    detail: "Supported by Liberty Strategic Capital and SoftBank, the kind of backing that means this technology will still be protecting you years from now.",
  },
];

const whyChoose = [
  {
    title: "Local support",
    detail: "Get help from a team based here in Malaysia, not an overseas call centre or a chatbot.",
  },
  {
    title: "Cybersecurity specialists",
    detail: "Backed by experienced security professionals who defend organisations across the region every day.",
  },
  {
    title: "CREST-accredited SOC",
    detail: "Supported by an independently validated Security Operations Centre, the gold standard for threat monitoring.",
  },
];

export default function Awards() {
  return (
    <section className="va-divider-top py-24 md:py-28 bg-[#0D0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why trust us"
          title="Don't just take our word for it"
          subtitle="Why businesses worldwide rely on Vigilant Asia MTD."
          tone="light"
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 60} className="h-full">
              <div className="group bg-[#130E0E] border border-white/10 rounded-2xl p-6 h-full transition-[border-color,transform,box-shadow] duration-[var(--dur-standard)] ease-[var(--ease-premium)] hover:border-[#C41E1E]/40 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(196,30,30,0.35)]">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <a.Icon />
                </div>
                <h3 className="text-white font-semibold mb-2">{a.title}</h3>
                <p className="text-stone-400 text-sm leading-6">{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 rounded-3xl border border-primary/20 bg-gradient-to-b from-[#1A0D0D] to-[#130E0E] p-8 md:p-12 shadow-[0_24px_64px_-32px_rgba(196,30,30,0.4)]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <img src="/logo.svg" alt="Vigilant Asia" className="h-10 w-auto mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Why Malaysian businesses choose us
              </h3>
              <p className="text-stone-400">
                Vigilant Asia is an award-winning cybersecurity provider. You get global-grade
                technology delivered with local expertise and support you can actually reach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {whyChoose.map((w, i) => (
                <Reveal key={w.title} delay={i * 60} className="h-full">
                  <div className="bg-[#0D0A0A]/70 border border-white/10 rounded-2xl p-6 h-full transition-[border-color,transform,box-shadow] duration-[var(--dur-standard)] ease-[var(--ease-premium)] hover:border-[#C41E1E]/40 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(196,30,30,0.35)]">
                    <h4 className="text-white font-semibold mb-2">{w.title}</h4>
                    <p className="text-stone-400 text-sm leading-6">{w.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
