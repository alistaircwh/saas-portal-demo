"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  className?: string;
};

export default function Tabs({ items, className }: TabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const measure = () => {
    const btn = tabRefs.current[active];
    if (!btn) return;
    setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="relative inline-flex max-w-full items-center gap-1 overflow-x-auto p-1 rounded-full bg-card border border-border"
      >
        {pill && (
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 rounded-full bg-primary transition-[left,width] duration-[var(--dur-standard)] ease-[var(--ease-premium)] shadow-[0_8px_24px_-12px_var(--primary)]"
            style={{ left: `${pill.left}px`, width: `${pill.width}px` }}
          />
        )}
        {items.map((item, i) => {
          const isActive = active === i;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative z-10 shrink-0 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors duration-[var(--dur-fast)]",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 w-full">
        {items.map((item, i) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`panel-${item.id}`}
            aria-labelledby={`tab-${item.id}`}
            hidden={active !== i}
          >
            {active === i && (
              <div className="animate-in fade-in-0 zoom-in-95 duration-200">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
