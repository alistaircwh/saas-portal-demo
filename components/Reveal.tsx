"use client";

import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "./useReveal";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  style?: CSSProperties;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  style,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("va-reveal", className)}
      style={{ ["--va-reveal-delay" as string]: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
