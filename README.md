# Hive Communities — Prototype

Tranche 1 prototype for the Hive Communities web presence. Built fresh from a Vite + React 19 + TypeScript + Tailwind 4 stack, with brand tokens lifted from the prospective PWA reference at `../prospective-pwa/`.

## What this is

A working public-side prototype of the new Hive site — landing page, three per-church pages, About, Visit, and Give — using mock data for the three churches. No backend, no Breeze integration yet, no member-side auth.

The goal of this tranche is to make the **shape** of the site reviewable before any leadership intake answers come back. Everything here is replaceable; nothing here is wired to real systems.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

## What's built (Tranche 1)

- **Public landing page** (`/`) with hero, mission framing, and the three-church grid
- **About page** (`/about`) — placeholder copy explaining the network
- **Visit page** (`/visit`) — "I'm new" path, no-form, person-routed
- **Give page** (`/give`) — per-church link-out pattern (URLs stub for now)
- **Per-church pages** (`/church/:slug`) — Green Tree, The Spring, Corpus Christi
- **WhatsApp + Discord deep-link buttons** — dual-rail chat integration per [REQUIREMENTS.md §11](../REQUIREMENTS.md)
- **Hive brand system** — green/purple/teal palette, organic theme tokens, CSS variables, Tailwind 4 `@theme` block
- **Responsive layout** — mobile-first; sticky nav with mobile menu
- **PWA manifest stub** — installable with icon + theme color
- **Custom favicon** — Hive hex with the three-church mark

## What's mocked (intentionally — not blockers)

- **Church data** in `src/data/churches.ts` — names of leaders, meeting times, exact locations, vibe descriptors are all PLACEHOLDERS pending leadership intake. The website thehive.org is known stale; nothing carried over.
- **Giving URLs** — empty until each church confirms their processor (see Q1 in REQUIREMENTS.md)
- **WhatsApp + Discord invite URLs** — empty until collected during onboarding
- **Sermon archive** — not built; embed-only model deferred to Tranche 2 (PUB-09)
- **Member-side auth + announcements + events + prayer + push** — Tranche 2

## What's deferred to later tranches

| Tranche | Scope |
|---------|-------|
| 2 | Member auth (Firebase), announcements feed, events list, prayer requests, FCM push, sermon embeds |
| 3 | Breeze API integration (Cloud Function + Firestore aggregation cache per [REQUIREMENTS.md §10](../REQUIREMENTS.md)) |
| 4 | Service worker / offline shell, leadership admin tooling, content-owner email-to-post fallback (NFR-13) |

## Architecture (current + planned)

```
prototype/
  src/
    App.tsx              ← BrowserRouter + route table
    main.tsx
    styles/
      brand.css          ← Hive palette + organic theme (Tailwind 4 @theme)
    lib/
      cn.ts              ← clsx + tailwind-merge utility
    types/
      index.ts           ← Church, Announcement, Event interfaces
    data/
      churches.ts        ← Mock data; will swap to Breeze API consumer in Tranche 3
    components/
      layout/            ← Container, PageHeader, SiteHeader, SiteFooter
      chat/              ← ChatRailButtons (WhatsApp + Discord deep-links)
    pages/               ← HomePage, AboutPage, VisitPage, GivePage, ChurchPage, NotFoundPage
  public/
    favicon.svg          ← Hive hex mark
    manifest.webmanifest ← PWA manifest
```

## Decisions encoded here

- **Tailwind 4 (not 3)** — CSS-based theme config (`@theme` block) makes brand tokens cleaner; no `tailwind.config.js` needed
- **React Router 7** — current major
- **No CMS, no Sanity Studio** — Breeze is the system of record per [REQUIREMENTS.md §10](../REQUIREMENTS.md); a second content store would duplicate Breeze
- **Public-first build order** — public pages ship before any auth surface, because the public pages are what unblocks the leadership conversation
- **Brand tokens lifted, not re-derived** — palette and organic-theme tokens are direct from the prospective PWA's brand guide ([prospective-pwa/README.md](../prospective-pwa/README.md) L21-136)
- **No native chat** — dual-rail WhatsApp + Discord deep-links per [REQUIREMENTS.md §11](../REQUIREMENTS.md)

## Reference material in this engagement folder

- [REQUIREMENTS.md](../REQUIREMENTS.md) — full capability scope (P0/P1/P2), 16 leadership questions, salvage map, Breeze + chat strategy
- [leadership-intake.md](../leadership-intake.md) — recipient-agnostic intake document for Hive leadership
- [prospective-pwa/](../prospective-pwa/) — third-party prospective build (cloned 2026-04-29); reference only, not a foundation
- [website-mockup/](../website-mockup/) — earlier static mockup; predates this prototype

## Things to revisit

- Add `@tailwindcss/typography` if AboutPage long-form gets longer (currently using manual spacing)
- Add a real per-church accent theming CSS variable scope so children can inherit (`--accent: var(--color-hive-green)`) instead of static class maps
- Service worker registration — the manifest is in place but no `sw.js` yet
- Open Graph + Twitter Card meta tags in index.html (single-line addition once we have a hero image)
