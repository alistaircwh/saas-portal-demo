# Vigilant Asia MTD Portal — CLAUDE.md

## Product Context

This is the marketing and sales website for **Vigilant Asia**, a Mobile Threat Defense (MTD) product targeting Malaysian businesses and consumers. The product is powered by Zimperium technology.

**Sales motion:** We give prospects a warm pitch first (in person, WhatsApp, referral), then direct them to this site to either subscribe directly or submit a contact enquiry. The site exists to close warm leads, not to generate cold traffic. Copy should be confident and reassuring — the visitor has already heard the pitch.

**Primary CTAs:** "Subscribe Now" (direct purchase) and contact form (for larger/business accounts that need a conversation first).

---

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router) — this version has breaking changes vs older Next.js; read `node_modules/next/dist/docs/` before touching routing or rendering patterns
- **React:** 19.2.4
- **Styling:** Tailwind CSS v4 (PostCSS plugin, `@tailwindcss/postcss`)
- **UI primitives:** Base UI (`@base-ui/react`) + shadcn components (in `components/ui/`)
- **Icons:** `lucide-react` v1.8
- **Animations:** `tw-animate-css` + project motion language (see [Motion & Interactions](#motion--interactions))
- **Language:** TypeScript strict mode

---

## Project Structure

```
mtd-portal/
├── app/
│   ├── layout.tsx          # Root layout — Navbar + Footer wrap all pages
│   ├── page.tsx            # Home page: Hero → HowItWorks → Pricing → SocialProof → Awards → FAQAccordion
│   ├── contact/
│   │   └── page.tsx        # Contact page (/contact)
│   └── api/
│       └── contact/
│           └── route.ts    # POST /api/contact — logs enquiry (stub; needs CRM/email integration)
├── components/
│   ├── Navbar.tsx          # Sticky nav — links to #how-it-works, #pricing; CTA → #pricing
│   ├── Hero.tsx            # Above-fold hero — headline + two CTAs
│   ├── HowItWorks.tsx      # 3-step onboarding: choose plan → QR email → scan & protect
│   ├── Pricing.tsx         # 1yr/2yr/3yr toggle (no monthly); 3 tiers: Personal, Family, Business
│   ├── SocialProof.tsx     # Testimonials / trust signals
│   ├── Awards.tsx          # Awards/trust badges section
│   ├── FAQAccordion.tsx    # FAQ section — heading text is "Common questions"
│   ├── ContactForm.tsx     # Form component used in /contact page
│   ├── Footer.tsx          # id="contact" — email + WhatsApp contact links
│   ├── Reveal.tsx          # Client wrapper: fade+rise an element when it enters viewport
│   ├── useReveal.ts        # IntersectionObserver hook used by Reveal (one-shot)
│   └── ui/                 # shadcn primitives: button, card, dialog, input
├── lib/
│   └── utils.ts            # cn() utility
└── public/
```

---

## Pricing Tiers (RM/yr — multi-year discount)

| Tier     | 1 Year | 2 Years | 3 Years | Devices   | Notes               |
|----------|--------|---------|---------|-----------|---------------------|
| Personal | RM 290 | RM 260  | RM 230  | 1         |                     |
| Family   | RM 490 | RM 440  | RM 390  | Up to 5   | Most popular        |
| Business | RM 990 | RM 890  | RM 790  | Up to 20  | Priority WhatsApp   |

No monthly plans. Toggle is 1 Year / 2 Years (Save 10%) / 3 Years (Save 21%).

---

## Brand & Design

- **Brand name:** Vigilant Asia
- **Primary color:** `#C41E1E` (red) — mapped to `text-primary` / `bg-primary`
- **Background:** Near-black (`#080808` / `#0C0C14`) with card surfaces in `bg-card`
- **Font:** Geist Sans (Google Fonts via `next/font`)
- **Tone:** Confident, warm, jargon-free. We talk to non-technical business owners and professionals — avoid security jargon unless explaining it immediately.

---

## Key Conventions

- All section anchor IDs: `#hero`, `#how-it-works`, `#pricing`, `#contact` (Footer)
- Contact page lives at `/contact`; the footer (`id="contact"`) serves as the in-page contact anchor on the home page
- `cn()` from `@/lib/utils` for conditional Tailwind classes
- `buttonVariants()` from `@/components/ui/button` for consistent button styles
- Server components by default; add `"use client"` only when state/interactivity is needed
- No comments unless the WHY is non-obvious

---

## Motion & Interactions

The site has a deliberate, restrained motion language. **Reuse it; don't invent new curves or durations.** All animations gate on `prefers-reduced-motion` via a global rule in `app/globals.css`.

**Design tokens** (defined in `app/globals.css` `@theme inline`):
- `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)` — the one easing curve for almost everything
- `--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)` — reserved for lifts/scales
- `--dur-fast: 150ms` — hover / focus feedback
- `--dur-standard: 350ms` — state changes, reveals, accordion, toggle pill
- `--dur-ambient: 700ms` — slow background drifts

**Keyframes** (in `app/globals.css`):
- `va-rise` — opacity 0 + translateY(12px) → 0; used by `.va-reveal`
- `va-glow-drift` — slow background-position oscillation (12s loop on the hero radial)
- `va-popular-pulse` — slow red box-shadow breath (4s loop, Pricing's Family tier only)
- `va-check-draw` — stroke-dasharray draw-on for the contact success SVG check

**Reusable primitives:**
- `<Reveal delay={ms}>` (`components/Reveal.tsx`) — wrap any element/section for an on-scroll fade+rise. One-shot (does not re-animate on scroll-up). Hero uses it on mount; sections use it on scroll. Stagger siblings with `delay`.
- `useReveal()` (`components/useReveal.ts`) — the underlying hook; returns a ref to attach to a node.
- `.va-reveal` CSS class — the styling layer used by `<Reveal>`; reveals when `data-revealed="true"` is set.
- `.va-link-underline` — underline-from-left on hover/focus. Used on navbar links and (via `.va-link-group` parent) on footer email/WhatsApp.

**Established interaction patterns** — copy these instead of inventing new ones:
- **Sliding toggle pill** (`components/Pricing.tsx`): refs on each button, one absolutely-positioned `<span>` indicator whose `left`/`width` transition via `--dur-standard`.
- **Smooth accordion / mobile menu expand** (`components/FAQAccordion.tsx`, `components/Navbar.tsx`): always-mounted inner panel inside a `grid` wrapper that animates `grid-template-rows: 0fr → 1fr`. No height measurement, no JS animation.
- **Cross-fading value swap** (Pricing price digits): wrap the changing value in a span keyed off the changing state (`key={years}`) plus `animate-in fade-in-0 zoom-in-95 duration-200` from `tw-animate-css`.
- **Card hover language** (`components/ui/card.tsx`, baseline): `hover:-translate-y-0.5 hover:ring-foreground/20`. Inherited by every Card on the site. Don't add big scales or rotations.
- **Reduced-motion is the floor, not the ceiling.** Never write an animation that bypasses the global `@media (prefers-reduced-motion: reduce)` rule.

**Things we deliberately do NOT do:** parallax, autoplay carousels, marquee strips, floating particles, bouncy springs, hero typewriters, custom cursors, hover scales > 1.02. If a future change wants one of these, push back.

---

## Running Locally

```bash
cd mtd-portal
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

---

## Tests

Playwright e2e tests live in `tests/`. Config: `playwright.config.ts` (Chromium only). `baseURL` defaults to `http://localhost:3000` but reads from `PLAYWRIGHT_BASE_URL` env if set — useful when Next falls back to port 3001 because something else holds 3000.

```bash
cd mtd-portal
npx playwright test                                        # run all 29 tests
PLAYWRIGHT_BASE_URL=http://localhost:3001 npx playwright test   # target alt port
npx playwright test --ui                                   # interactive UI mode
```

Test files:
- `tests/api.spec.ts` — API contract tests for `POST /api/contact` (valid payload → 200, missing required fields → 400)
- `tests/contact.spec.ts` — Contact page: form renders, submit state, success/error UI
- `tests/home.spec.ts` — Homepage: title, navbar, section anchors, pricing toggle, FAQ accordion, mobile nav

**Playwright selector gotchas (strict mode):**
- Use `exact: true` or `getByRole("heading", { name: "..." })` when text appears in multiple elements
- FAQAccordion heading is **"Common questions"** (not "Frequently asked")
- Pricing tier headings must use `getByRole("heading")` — tier names appear in multiple nodes
- The FAQ panel and mobile menu are **always in the DOM** (collapsed via `grid-template-rows: 0fr`). Assert `toBeVisible()` after expand, not `toHaveCount(0)` before.
- The Pricing term toggle has a sliding indicator `<span>` *behind* the buttons — the active "selected" styling lives on that span, not the button itself. Assert on text/aria-pressed, not on the active background class.

**Known stale tests:** `tests/home.spec.ts` lines 66–84 reference a Monthly/Annual toggle that no longer exists (the UI is 1/2/3-Year). These two tests have been failing since before the pricing UI changed and should be rewritten against the current term toggle.

---

## Browser Verification

Use **MCP Playwright** (`mcp__playwright__*` tools) to verify UI changes and test website functionality at `http://localhost:3000`. Use it whenever:

- A UI or layout change needs visual confirmation
- A feature's behaviour needs to be verified in the browser (navigation, forms, toggles, animations)
- A fix requires end-to-end validation before reporting completion

Typical verification flow:
1. `mcp__playwright__browser_navigate` → `http://localhost:3000`
2. `mcp__playwright__browser_snapshot` to inspect rendered state
3. `mcp__playwright__browser_click` / `mcp__playwright__browser_fill_form` for interactive flows
4. `mcp__playwright__browser_take_screenshot` if a visual record is useful

Always verify the golden path (page loads, primary CTAs work, pricing toggle works) after any change that touches layout, routing, or interactive components.

---

## Known TODOs / Stubs

- `app/api/contact/route.ts` — currently only `console.log`s enquiries; needs email (e.g. Resend) or CRM integration
- WhatsApp link in Footer uses placeholder `wa.me/60XXXXXXXXX` — replace with real number
- Terms of Service and Privacy Policy links are `href="#"` placeholders
- `tests/home.spec.ts` lines 66–84 reference a non-existent Monthly/Annual toggle and need rewriting against the 1/2/3-Year term toggle (see Tests section)
