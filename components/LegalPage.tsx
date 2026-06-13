import type { ReactNode } from "react";

export default function LegalPage({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">{title}</h1>
          {subtitle && <p className="text-muted-foreground text-lg max-w-xl">{subtitle}</p>}
          {lastUpdated && (
            <p className="text-muted-foreground text-sm mt-4">Last updated: {lastUpdated}</p>
          )}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="va-legal space-y-8 text-foreground/80 leading-7">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-medium text-foreground">{heading}</h2>
      <div className="space-y-3 text-foreground/80 leading-7">{children}</div>
    </div>
  );
}
