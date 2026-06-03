# Vigilant Asia — MTD Portal

Marketing and sales site for **Vigilant Asia**, a Mobile Threat Defense product for Malaysian businesses and consumers, powered by Zimperium.

**Live:** https://mobile-threat-defense.vercel.app

> Version 1. Copy, pricing, and trust badges are placeholder content pending business sign-off. The structure and the reasoning below are settled.

## Not in this repo

The production build has a payment gateway and automated license provisioning that emails the QR to the buyer. That side of things is confidential and isn't part of this public repo.

## Stack

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Base UI (`@base-ui/react`) and shadcn primitives in [components/ui/](components/ui/)
- Playwright (Chromium) for end-to-end tests

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Project layout

```
app/                App Router pages and /api/contact route
components/         Section components (Hero, Pricing, FAQAccordion, ...) and ui/ primitives
lib/utils.ts        cn() helper
tests/              Playwright e2e specs
```

Section anchors: `#hero`, `#how-it-works`, `#pricing`, `#contact` (footer).

## Tests

```bash
npx playwright test
PLAYWRIGHT_BASE_URL=http://localhost:3001 npx playwright test
npx playwright test --ui
```

Specs in [tests/](tests/): `api.spec.ts`, `contact.spec.ts`, `home.spec.ts`.
