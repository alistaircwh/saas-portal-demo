"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur transition-[background-color,border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-premium)]",
        scrolled
          ? "bg-background/85 border-b border-border shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
          : "bg-background/60 border-b border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Vigilant Asia" className="h-9 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="va-link-underline text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#pricing"
            className={cn(buttonVariants({ variant: "default" }), "h-9 px-4 text-sm font-semibold")}
          >
            Subscribe Now
          </a>
        </div>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div
        className={cn(
          "md:hidden grid overflow-hidden transition-[grid-template-rows] duration-[var(--dur-standard)] ease-[var(--ease-premium)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "border-t border-border bg-card px-4 py-4 flex flex-col gap-4 transition-opacity duration-[var(--dur-standard)] ease-[var(--ease-premium)]",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className={cn(buttonVariants({ variant: "default" }), "h-9 px-4 text-sm font-semibold text-center")}
              onClick={() => setOpen(false)}
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}


function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-premium)]"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}
