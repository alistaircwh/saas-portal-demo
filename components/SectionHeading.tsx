import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

// Signature move: in any multi-word headline the first word is mint, the rest
// cream. Applied automatically when the title is a plain string.
function firstWordMint(title: ReactNode): ReactNode {
  if (typeof title !== "string") return title;
  const [first, ...rest] = title.split(" ");
  if (rest.length === 0) return title;
  return (
    <>
      <span className="text-primary">{first}</span> {rest.join(" ")}
    </>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
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
            "va-overline inline-flex items-center gap-3 text-xs text-muted-foreground",
            centered && "justify-center",
          )}
        >
          <span className="h-px w-7 bg-gradient-to-r from-transparent to-border" />
          {eyebrow}
          {centered && (
            <span className="h-px w-7 bg-gradient-to-l from-transparent to-border" />
          )}
        </span>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="mt-5 text-4xl md:text-5xl font-light leading-[1.17] text-balance text-foreground">
          {firstWordMint(title)}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={140}>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
