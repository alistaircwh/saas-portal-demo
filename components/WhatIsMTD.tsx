import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tabs, { type TabItem } from "@/components/Tabs";

const benefits = [
  "Real-time protection, day and night",
  "Detects both known and unknown threats",
  "AI-powered detection stops attacks early",
  "Protects against phishing and scams",
  "Works on both Android and iOS",
  "Lightweight, with no drain on speed or battery",
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary shrink-0 mt-0.5">
        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

function DeviceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function NetworkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12c2-1.8 4.4-2.8 7-2.8s5 1 7 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 15.5c1.1-1 2.5-1.6 4-1.6s2.9.6 4 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 19v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function PhishingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function AppsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const categories: {
  id: string;
  label: string;
  Icon: React.ComponentType;
  intro: string;
  items: string[];
}[] = [
  {
    id: "device",
    label: "Device",
    Icon: DeviceIcon,
    intro: "Your phone's operating system is constantly targeted by attackers seeking control of your device. Vigilant Asia MTD identifies:",
    items: ["Rooted devices", "Jailbroken devices", "Security vulnerabilities", "Suspicious device behaviour", "Operating system compromise"],
  },
  {
    id: "network",
    label: "Network",
    Icon: NetworkIcon,
    intro: "Public Wi-Fi can expose sensitive information if it isn't properly secured. Vigilant Asia MTD detects:",
    items: ["Unsafe Wi-Fi networks", "Man-in-the-middle attacks", "Rogue access points", "Network interception attempts", "Suspicious connections"],
  },
  {
    id: "phishing",
    label: "Phishing",
    Icon: PhishingIcon,
    intro: "Cybercriminals increasingly use SMS, email, and messaging apps to trick people into revealing sensitive information. Vigilant Asia MTD protects against:",
    items: ["SMS phishing (smishing)", "Email phishing", "WhatsApp scams", "Fake websites", "Malicious QR codes"],
  },
  {
    id: "apps",
    label: "Malicious apps",
    Icon: AppsIcon,
    intro: "Not every app is safe. Vigilant Asia MTD helps identify:",
    items: ["Malware", "Spyware", "Risky applications", "Excessive permissions", "App-based attacks"],
  },
];

export default function WhatIsMTD() {
  const tabItems: TabItem[] = categories.map((c) => ({
    id: c.id,
    label: c.label,
    icon: <c.Icon />,
    content: (
      <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-8">
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{c.intro}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {c.items.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="what-is-mtd" className="va-divider-top py-24 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="What is MTD"
          title="What is Mobile Threat Defence?"
          subtitle="A mobile security solution that protects your phones and tablets from phishing, malicious apps, network threats, and device vulnerabilities, in real time and quietly in the background."
          className="mb-12"
        />

        <Reveal delay={120}>
          <ul className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-20">
            {benefits.map((b) => (
              <CheckItem key={b}>{b}</CheckItem>
            ))}
          </ul>
        </Reveal>

        <div className="text-center mb-8">
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Comprehensive protection against every angle
            </h3>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pick a threat type to see exactly what we watch for.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Tabs items={tabItems} />
        </Reveal>
      </div>
    </section>
  );
}
