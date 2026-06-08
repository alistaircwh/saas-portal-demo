import Reveal from "@/components/Reveal";

const awards = [
  {
    badge: "🥇",
    title: "#1 Ranked by Forrester",
    detail: "Named the top mobile security solution across 11 competing vendors, evaluated on 22 independent criteria (Forrester Wave, Q3 2024).",
  },
  {
    badge: "🇺🇸",
    title: "Used by the U.S. Department of Defence",
    detail: "The first mobile security vendor to receive FedRAMP authorisation — the standard required to operate inside U.S. federal government systems.",
  },
  {
    badge: "🏢",
    title: "Trusted by the World's Biggest Names",
    detail: "Microsoft, two of the world's largest airlines, two leading car manufacturers, and one of the world's biggest oil producers all rely on this protection.",
  },
  {
    badge: "⭐",
    title: "4.4/5 on Gartner Peer Insights",
    detail: "Rated 4.4 out of 5 by 58 verified enterprise customers on Gartner Peer Insights — one of the most trusted independent software review platforms.",
  },
  {
    badge: "🏆",
    title: "Mobile Security Solution of the Year",
    detail: "Winner of the 2025 Mobile Breakthrough Award for Best Mobile Security Solution — recognised globally for protecting real businesses from real threats.",
  },
  {
    badge: "💼",
    title: "Backed by World-Class Investors",
    detail: "Supported by Liberty Strategic Capital and SoftBank — the kind of backing that means this technology will still be protecting you years from now.",
  },
];

export default function Awards() {
  return (
    <section className="py-20 bg-[#0D0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              You Can Trust This
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-stone-400 max-w-xl mx-auto text-lg">
              Don&apos;t just take our word for it — here&apos;s why thousands of businesses around the world rely on Vigilant Asia MTD.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 60} className="h-full">
              <div className="bg-[#130E0E] border border-white/10 rounded-2xl p-6 h-full transition-[border-color,transform,box-shadow] duration-[var(--dur-standard)] ease-[var(--ease-premium)] hover:border-[#C41E1E]/40 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(196,30,30,0.35)]">
                <div className="text-3xl mb-3">{a.badge}</div>
                <h3 className="text-white font-semibold mb-2">{a.title}</h3>
                <p className="text-stone-400 text-sm leading-6">{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
