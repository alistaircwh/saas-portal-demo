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
- **Database:** PostgreSQL on Supabase, accessed via Prisma 7 with the `@prisma/adapter-pg` driver adapter
- **ORM:** Prisma 7 — schema at `prisma/schema.prisma`, generated client at `lib/generated/prisma/`

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
│       ├── contact/
│       │   └── route.ts    # POST /api/contact — logs enquiry (stub; needs CRM/email integration)
│       ├── orders/
│       │   └── [id]/pay/
│       │       └── route.ts  # POST /api/orders/:id/pay — creates Payment record, sets order to pending_payment, returns gateway redirect URL
│       ├── payments/
│       │   └── callback/
│       │       └── route.ts  # POST /api/payments/callback — gateway webhook; validates signature, deduplicates, triggers fulfillOrder on success
│       ├── dev/
│       │   ├── seed/
│       │   │   └── route.ts  # DEV ONLY — seeds a test package/user/order; delete before prod
│       │   └── demo/
│       │       └── route.ts  # DEV ONLY — seeds + initiates payment + redirects to mock checkout in one click; delete before prod
│       └── mock-checkout/
│           └── route.ts    # Renders fake payment page with success/fail buttons that POST to the callback route
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
│   ├── utils.ts            # cn() utility
│   ├── prisma.ts           # Singleton PrismaClient wired to the pg driver adapter
│   ├── generated/prisma/   # Auto-generated Prisma client — do not edit manually
│   ├── email/
│   │   └── index.ts        # sendActivationEmail — mocks or queues via Resend; fetches licenses and generates QR/token email
│   ├── orders/
│   │   └── fulfill.ts      # fulfillOrder — idempotent post-payment handler: provisions subscriptions/licenses then sends activation email
│   ├── payment/
│   │   ├── types.ts        # PaymentProvider interface + CreatePaymentInput/Result/CallbackResult types
│   │   ├── mock.ts         # MockPaymentProvider — redirects to /mock-checkout for local testing
│   │   ├── ipay88.ts       # IPay88Provider skeleton — not yet implemented
│   │   └── index.ts        # getPaymentProvider() factory — returns mock or iPay88 based on PAYMENT_PROVIDER env
│   └── provisioning/
│       ├── types.ts        # ProvisioningProvider interface + ProvisionInput/ProvisionedLicense types
│       ├── mock.ts         # MockProvisioningProvider — returns fake tokens/QR payloads for testing
│       ├── zimperium.ts    # ZimperiumProvider skeleton — not yet implemented
│       └── index.ts        # getProvisioningProvider() factory — returns mock or Zimperium based on PROVISIONING_PROVIDER env
├── prisma/
│   ├── schema.prisma       # Database schema — source of truth for models/enums
│   └── migrations/         # Applied migration SQL files (committed to git)
├── prisma.config.ts        # Prisma CLI config — points migrations at DIRECT_URL
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

The visual system is a "midnight vault" (structure from `DESIGN.md`, a Dashlane-style reference) carrying Vigilant Asia's own brand accents. The reference's *structure* applies (surfaces, two-weight type, pill buttons, flat cards); its accent colors do NOT — the primary accent is the Vigilant brand red (`#910000` from the logo on vigilantasia.com.my), lifted to a vivid scarlet so it reads as red and stays legible on the dark canvas.

- **Brand name:** Vigilant Asia
- **Theme:** Dark, warm. Cocoa near-black page (`--background: #200f0a`), deep plum card surfaces (`--card: #2b2538`), aubergine (`--muted: #4d3f3b`) for nested emphasis only. Warm-sand hairline borders (`--border: rgba(227,204,192,0.18)`) — never cold grays on dark surfaces. Text is cream `#fcfaf9` (never pure white); muted text is stone `#a69f9d`.
- **Accent voices:** Two voices, never both on one control. Filled/primary voice: Vigilant Red `--primary: #e63329` (brand `#910000` lifted for the dark canvas; on-red text is cream `--primary-foreground: #fcfaf9`) — CTAs, eyebrow numbers, icon chips, first-word headline accent, focused conversion moments. Outlined/secondary voice: Vigilant Gold `--accent: #f2b13c` — chosen to complement the red and keep the palette warm (never cold). Outlined buttons and secondary highlights only.
- **First-word accent rule:** in any multi-word headline, the first word is `text-primary` (coral), the rest cream. `SectionHeading` applies this automatically for string titles.
- **Two-weight typography:** weight 300 (`font-light`) for all headlines, display sizes, and big stats; weight 500 (`font-medium`, also the body default set on `<body>`) for everything else. **Never use `font-semibold` or `font-bold`.** Size and color do the emphasis. Mono overlines use the `.va-overline` utility (uppercase, 0.06em tracking).
- **Shapes:** buttons/tags/pills are `rounded-full` (9999px); cards/panels/images 8px (`rounded-lg`; the `--radius-*` scale collapses xl+ to 8px); inputs 4px (`rounded-md`).
- **Elevation:** cards are FLAT — no drop shadows; separation comes from the surface scale + warm-sand hairlines (`shadow-card`/`shadow-card-hover` tokens are zeroed). `shadow-pop` is reserved for genuinely floating panels (e.g. the phone mockup).
- **Surface tokens:** `surface-dark*` tokens now map to the plum elevation scale and are used by the FinalCTA panel and Footer (elevated anchors on the cocoa canvas).
- **Logos:** the page is dark, so `public/logo.svg` (white) is used everywhere (Navbar, Footer, Awards panel). `public/logo-dark.svg` is reserved for light islands (e.g. email templates, light embeds).
- **Status colors:** `--success`/`--warning`/`--danger` are dark-tuned light tints; `-soft` variants are translucent washes. `ThreatVisual.tsx` mirrors these as local hex consts (the gradients/`33` alpha math need literal values) and renders the phone screen in the vault palette — cocoa screen, plum cards, cream text, warm-sand hairlines — so status color appears only as small functional punctuation, never as a bright light island.
- **Font:** Inter (300 + 500 only) as `--font-saans`, JetBrains Mono (300) as `--font-saans-mono`, via `next/font`.
- **Tone:** Confident, warm, jargon-free. We talk to non-technical business owners and professionals — avoid security jargon unless explaining it immediately. Never use em dashes in site copy; use periods or commas instead.

**Do not:** use pure black or pure white; use weights 600/700; pair red and gold on the same control; add drop shadows to cards; use rectangular buttons; render body text below 14px; add more than the existing accent washes (strong red glows read muddy on cocoa — keep radial glow opacity ≤ 0.14).

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
- `va-glow-drift` — slow background-position oscillation (12s loop on the hero coral radial); opacity tuned low (0.07–0.12) — stronger washes read muddy on cocoa
- `va-popular-pulse` — slow 1px coral ring breath (4s loop, Pricing's Family tier only); a hairline-intensity pulse, not a drop shadow — cards stay flat
- `va-check-draw` — stroke-dasharray draw-on for the contact success SVG check
- `va-flow-pulse` / `va-flow-arrow` — HowProtectionWorks flow diagram; resting colors are `var(--border)` / `var(--card)`, highlight is coral

**Reusable primitives:**
- `<Reveal delay={ms}>` (`components/Reveal.tsx`) — wrap any element/section for an on-scroll fade+rise. One-shot (does not re-animate on scroll-up). Hero uses it on mount; sections use it on scroll. Stagger siblings with `delay`.
- `useReveal()` (`components/useReveal.ts`) — the underlying hook; returns a ref to attach to a node.
- `.va-reveal` CSS class — the styling layer used by `<Reveal>`; reveals when `data-revealed="true"` is set.
- `.va-link-underline` — underline-from-left on hover/focus. Used on navbar links and (via `.va-link-group` parent) on footer email/WhatsApp.

**Established interaction patterns** — copy these instead of inventing new ones:
- **Sliding toggle pill** (`components/Pricing.tsx`): refs on each button, one absolutely-positioned `<span>` indicator whose `left`/`width` transition via `--dur-standard`.
- **Smooth accordion / mobile menu expand** (`components/FAQAccordion.tsx`, `components/Navbar.tsx`): always-mounted inner panel inside a `grid` wrapper that animates `grid-template-rows: 0fr → 1fr`. No height measurement, no JS animation.
- **Cross-fading value swap** (Pricing price digits): wrap the changing value in a span keyed off the changing state (`key={years}`) plus `animate-in fade-in-0 zoom-in-95 duration-200` from `tw-animate-css`.
- **Card hover language** (`components/ui/card.tsx`, baseline): `hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-foreground/15`. Inherited by every Card on the site. Don't add big scales or rotations.
- **Reduced-motion is the floor, not the ceiling.** Never write an animation that bypasses the global `@media (prefers-reduced-motion: reduce)` rule.

**Things we deliberately do NOT do:** parallax, autoplay carousels, marquee strips, floating particles, bouncy springs, hero typewriters, custom cursors, hover scales > 1.02. If a future change wants one of these, push back.

---

## Database

Hosted on **Supabase** (PostgreSQL). Prisma 7 manages the schema and migrations.

**Two connection strings** — both required in `.env`:

| Variable | Port | Used by | Purpose |
|---|---|---|---|
| `DATABASE_URL` | 6543 | App runtime (`lib/prisma.ts`) | Transaction-mode pooler (`pgbouncer=true`) — optimised for serverless |
| `DIRECT_URL` | 5432 | Prisma CLI (`prisma.config.ts`) | Session-mode pooler — required for DDL/migrations |

**Common commands** (run from project root):

```bash
npx prisma migrate dev --name <description>   # create + apply a new migration
npx prisma migrate deploy                      # apply pending migrations (CI/prod)
npx prisma generate                            # regenerate client after schema change
npx prisma studio                              # browse data in the browser
```

Always run `npx prisma generate` after editing `prisma/schema.prisma`. The generated client in `lib/generated/prisma/` is gitignored — never edit it manually.

**Schema summary** — key models: `User`, `Company`, `Package`/`PackagePrice`, `Order`/`OrderItem`, `Payment`/`PaymentEvent`, `Subscription`/`License`, `PromoCode`, `Document`, `AuditLog`, `EmailLog`, `LoginHistory`. See `prisma/schema.prisma` for full detail.

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

The pricing toggle tests assert against the 1/2/3-Year term toggle (`aria-pressed` + per-term prices and billing notes).

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
- `lib/payment/ipay88.ts` — iPay88 payment provider skeleton; not yet implemented (set `PAYMENT_PROVIDER=mock` for local dev)
- `lib/provisioning/zimperium.ts` — Zimperium license provisioning skeleton; not yet implemented (set `PROVISIONING_PROVIDER=mock` for local dev)
- `lib/email/index.ts` — email sending is mocked; wire up Resend (or similar) for production
- `app/api/dev/` — `seed/` and `demo/` routes are dev-only helpers; **delete before deploying to production**
- `app/refund-policy/page.tsx` — interim case-by-case refund terms; replace with finalised refund window once confirmed
