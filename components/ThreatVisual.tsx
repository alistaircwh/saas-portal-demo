"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, Globe, Smartphone, Wifi, MapPin, ChevronRight } from "lucide-react";

type StatusKey = "secure" | "unsecured" | "risk";

interface CardData {
  lines: string[];
  alert: boolean;
}

interface ScreenState {
  key: StatusKey;
  accent: string;
  accentSoft: string;
  title: string;
  subtitle: string;
  note: string;
  button: string;
  cards: {
    apps: CardData;
    web: CardData;
    device: CardData;
    wifi: CardData;
  };
}

// Dark-tuned status palette mirroring --success/--danger/--warning (+ -soft)
// in globals.css. The phone screen is no longer a light island: it sits inside
// the midnight vault, so surfaces are cocoa/plum, text is cream, borders are
// warm-sand hairlines, and status colour appears only as small functional
// punctuation (DESIGN.md). Kept as local consts because the gradients/`33`
// alpha math below need the literal values.
const GREEN = "#7EE2A8";
const GREEN_SOFT = "rgba(126,226,168,0.14)";
const RED = "#F59A9A";
const RED_SOFT = "rgba(245,154,154,0.14)";
const AMBER = "#F5C065";
const AMBER_SOFT = "rgba(245,192,101,0.14)";

// Vault surfaces for the in-screen UI.
const SCREEN_BG = "#1b100c"; // cocoa, one notch off the device frame
const PANEL = "#2b2538"; // deep plum card surface
const HAIRLINE = "rgba(227,204,192,0.18)"; // warm-sand hairline
const CREAM = "#fcfaf9";
const STONE = "#a69f9d";
const STONE_DIM = "rgba(166,159,157,0.55)";
const COCOA = "#200f0a"; // on-accent text

const WEB: CardData = { lines: ["LAST 7 DAYS", "40 Scans", "3 Sites Blocked"], alert: false };

// Cycle order follows the requested narrative: secure → not secured → at risk.
const states: ScreenState[] = [
  {
    key: "secure",
    accent: GREEN,
    accentSoft: GREEN_SOFT,
    title: "NO THREAT DETECTED",
    subtitle: "YOUR DEVICE IS SECURED",
    note: "IT'S LOOKING GOOD!",
    button: "Report",
    cards: {
      apps: { lines: ["LAST 7 DAYS", "25 Apps Scanned"], alert: false },
      web: WEB,
      device: { lines: ["LAST 7 DAYS", "300 Device Scans"], alert: false },
      wifi: { lines: ["LAST 7 DAYS", "33 Network Scans"], alert: false },
    },
  },
  {
    key: "unsecured",
    accent: RED,
    accentSoft: RED_SOFT,
    title: "THREAT DETECTED",
    subtitle: "YOUR DEVICE IS NOT SECURED",
    note: "1 ACTIVE ISSUE",
    button: "Fix",
    cards: {
      apps: { lines: ["LAST 7 DAYS", "25 Apps Scanned"], alert: false },
      web: WEB,
      device: { lines: ["Device Compromised"], alert: true },
      wifi: { lines: ["LAST 7 DAYS", "33 Network Scans"], alert: false },
    },
  },
  {
    key: "risk",
    accent: AMBER,
    accentSoft: AMBER_SOFT,
    title: "RISK DETECTED",
    subtitle: "YOUR DEVICE IS AT RISK",
    note: "2 ACTIVE ISSUES",
    button: "Fix",
    cards: {
      apps: { lines: ["3 Risky Apps Detected"], alert: true },
      web: WEB,
      device: { lines: ["LAST 7 DAYS", "300 Device Scans"], alert: false },
      wifi: { lines: ["Unsecured Wi-Fi detected"], alert: true },
    },
  },
];

const transition = "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function ThreatVisual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % states.length), 3400);
    return () => clearInterval(id);
  }, []);

  const state = states[index];

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      {/* Ambient glow behind the device — tinted to the current state */}
      <div
        className={cnGlow}
        style={{
          background: `radial-gradient(circle at 60% 38%, ${state.accent}26, transparent 70%)`,
          transition: "background 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-hidden="true"
      />

      <div className="relative rounded-[2.75rem] border border-border bg-gradient-to-b from-[#161010] to-[#0A0808] p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-3 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#0A0808]" />

        {/* Screen — the live MTD app UI (vault theme) */}
        <div
          className="relative overflow-hidden rounded-[2.1rem] px-3.5 pb-4 pt-7"
          style={{ backgroundColor: SCREEN_BG, color: CREAM }}
        >
          {/* Status bar */}
          <div className="mb-3 flex items-center justify-between px-1 text-[10px] font-medium" style={{ color: CREAM }}>
            <span>9:41</span>
            <span className="flex items-center gap-2" style={{ color: STONE }}>
              <SignalIcon />
              <WifiBars />
              <BatteryIcon />
              <span className="ml-0.5 grid grid-cols-2 gap-[2px]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="h-[3px] w-[3px] rounded-[1px]" style={{ backgroundColor: STONE_DIM }} />
                ))}
              </span>
            </span>
          </div>

          {/* Header / status hero */}
          <div
            className={`mb-3 flex flex-col items-center rounded-2xl border px-4 pb-4 pt-3 text-center ${transition}`}
            style={{
              background: `linear-gradient(180deg, ${state.accentSoft} 0%, ${PANEL} 100%)`,
              borderColor: HAIRLINE,
            }}
          >
            <RadarShield accent={state.accent} />

            <div
              key={state.key}
              className="flex flex-col items-center animate-in fade-in-0 slide-in-from-bottom-1 duration-500"
            >
              <p className={`mt-2 text-[13px] font-medium tracking-wide ${transition}`} style={{ color: state.accent }}>
                {state.title}
              </p>
              <p className="mt-0.5 text-[12px] font-medium tracking-wide" style={{ color: CREAM }}>{state.subtitle}</p>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider" style={{ color: STONE }}>{state.note}</p>
            </div>

            <span
              className="mt-2.5 rounded-full px-5 py-1 text-[11px] font-medium"
              style={{ backgroundColor: state.accent, color: COCOA }}
            >
              {state.button}
            </span>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-2 gap-2">
            <StatusCard label="Secure Apps" icon={LayoutGrid} card={state.cards.apps} accent={state.accent} accentSoft={state.accentSoft} />
            <StatusCard label="Secure Web" icon={Globe} card={state.cards.web} accent={state.accent} accentSoft={state.accentSoft} />
            <StatusCard label="Secure Device" icon={Smartphone} card={state.cards.device} accent={state.accent} accentSoft={state.accentSoft} />
            <StatusCard label="Secure Wi-Fi" icon={Wifi} card={state.cards.wifi} accent={state.accent} accentSoft={state.accentSoft} />
          </div>

          {/* Threat zones */}
          <div
            className="mt-2 flex items-center gap-2.5 rounded-xl border p-2.5"
            style={{ backgroundColor: PANEL, borderColor: HAIRLINE }}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: GREEN_SOFT }}>
              <MapPin size={14} strokeWidth={2} style={{ color: GREEN }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium leading-tight" style={{ color: CREAM }}>Threat Zones</p>
              <p className="text-[9px] leading-tight" style={{ color: STONE }}>Identify malicious networks around you</p>
            </div>
            <ChevronRight size={14} className="shrink-0" style={{ color: STONE_DIM }} />
          </div>
        </div>
      </div>

      {/* Cycle indicator */}
      <div className="mt-5 flex items-center justify-center gap-2" aria-hidden="true">
        {states.map((s, i) => (
          <span
            key={s.key}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-5" : "w-1.5"}`}
            style={{ backgroundColor: i === index ? state.accent : "rgba(252,250,249,0.2)" }}
          />
        ))}
      </div>
    </div>
  );
}

const cnGlow = "absolute -inset-8 rounded-full opacity-40 blur-3xl";

function StatusCard({
  label,
  icon: Icon,
  card,
  accent,
  accentSoft,
}: {
  label: string;
  icon: typeof LayoutGrid;
  card: CardData;
  accent: string;
  accentSoft: string;
}) {
  const iconColor = card.alert ? accent : GREEN;
  const iconBg = card.alert ? accentSoft : GREEN_SOFT;

  return (
    <div
      className="relative flex min-h-[78px] flex-col justify-between rounded-xl border p-2.5"
      style={{ backgroundColor: PANEL, borderColor: HAIRLINE }}
    >
      {card.alert && (
        <span
          className="absolute right-2 top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-medium"
          style={{ backgroundColor: accent, color: COCOA }}
        >
          !
        </span>
      )}
      <p className="text-[11px] font-medium leading-tight" style={{ color: CREAM }}>{label}</p>

      <div key={card.lines.join("|")} className="mt-1 animate-in fade-in-0 duration-500">
        {card.alert ? (
          <p className="text-[10px] font-medium leading-tight" style={{ color: CREAM }}>{card.lines[0]}</p>
        ) : (
          card.lines.map((line, i) => (
            <p
              key={i}
              className={i === 0 ? "text-[8px] font-medium uppercase tracking-wider leading-tight" : "text-[10px] font-medium leading-tight"}
              style={{ color: i === 0 ? STONE_DIM : CREAM }}
            >
              {line}
            </p>
          ))
        )}
      </div>

      <div className="mt-1.5 flex items-end justify-between">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${transition}`} style={{ backgroundColor: iconBg }}>
          <Icon size={14} strokeWidth={2} style={{ color: iconColor }} className={transition} />
        </div>
        <ChevronRight size={13} style={{ color: STONE_DIM }} />
      </div>
    </div>
  );
}

function RadarShield({ accent }: { accent: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className={transition} style={{ color: accent }}>
      <circle cx="26" cy="26" r="22" stroke="currentColor" strokeOpacity="0.25" strokeWidth="6" />
      <circle cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="14 8" />
      {/* tick marks */}
      <path d="M26 2v4M26 46v4M2 26h4M46 26h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* shield */}
      <path
        d="M26 14l7 2.6v5.2c0 4.3-3 7.3-7 9.5-4-2.2-7-5.2-7-9.5v-5.2L26 14z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M22.5 23.4l2.4 2.4 4.4-4.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2" width="3" height="10" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.4" />
    </svg>
  );
}

function WifiBars() {
  return (
    <svg width="14" height="10" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M1 4.5a11 11 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.5 7a7 7 0 0 1 9 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="9.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="20" height="11" viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" strokeOpacity="0.5" />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}
