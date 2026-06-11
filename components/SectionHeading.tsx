import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  /** Tone of the title text — light for dark "warm" surfaces. */
  tone?: "default" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
            centered && "justify-center",
          )}
        >
          <span className="h-px w-7 bg-gradient-to-r from-transparent to-primary/70" />
          {eyebrow}
          {centered && (
            <span className="h-px w-7 bg-gradient-to-l from-transparent to-primary/70" />
          )}
        </span>
      </Reveal>

      <Reveal delay={80}>
        <h2
          className={cn(
            "mt-5 text-3xl md:text-4xl font-bold tracking-tight text-balance",
            tone === "light" ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={140}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed text-pretty",
              tone === "light" ? "text-stone-400" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
