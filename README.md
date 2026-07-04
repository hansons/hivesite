# The Hive — Website Mockup

Single-file static mockup of an updated Hive Communities website. Open `index.html` in any browser — no server, no build step, no dependencies.

## What this is

A concrete visual + structural proposal to replace the current (obsolete) Wix site at thehive.org. Intended for the client conversation, not production deployment.

## Interactive demo: Sign in + edit churches

The mockup now previews the **church-admin editing experience** (the capability the comms admin would use day-to-day):

- **Sign in** (nav, top-right) — prototype auth: *any* email + password signs you in. No real account; nothing leaves the browser. Stands in for the real magic-link auth in the production spec.
- **Edit mode** — once signed in, an "Edit" button appears on each church (card and sub-page). You can change **name, description, hosts, when, where**.
- **Persistence** — edits save to the browser's `localStorage`, so they survive a reload during a demo. "Reset demo data" (admin bar) restores the originals. This is a stand-in for the real datastore — **not** a database, and not synced anywhere.
- **Church sub-pages** — clicking a church card (or "Visit →") opens a per-church sub-page at a hash route (`#church/green-tree`, etc.), rendered from the same data that drives the card. Browser back / "← All communities" returns to the network page.

**Demo-only caveats (say this out loud to the client):** auth is fake, storage is per-browser, and in production all of this maps to the spec — real auth (MEM-01), Breeze as system of record for church/meeting data (NFR-06), and the content-owner UX guardrails (NFR-13). The single source of truth here is a small JS data object, so card + sub-page + editor never drift.

## Simulated Breeze (Tithely) integration

The mockup also **simulates the Breeze read-path** so leadership can see what a completed integration feels like. It mirrors the real architecture (REQUIREMENTS §10): a mock "Breeze" datastore → a client that fetches with a short delay → rendered surfaces.

- **Calendar** — the (formerly empty) calendar section now fills with realistic upcoming events "synced from Breeze": weekly gatherings for all three churches, the first-Sunday All-Hive gathering, and a Festival of Tents date. Events are generated relative to today, so they always read as upcoming.
- **Leadership directory** — the new "Our leaders" section (and each church sub-page) shows per-church leadership/contacts "from Breeze," demonstrating tags-as-roles. The Spring shows "Host — to be confirmed," matching our real open question rather than asserting a name.
- **Sync theater** — both surfaces show a "Syncing… → Synced from Breeze · <time>" badge. When signed in, the admin bar shows **Breeze: 3 churches connected**, a **Sync now** button (re-runs the sync with a spinner + fresh timestamp), and a **Connections** panel listing the three church accounts as connected.

**What's real vs. fake:** the *data flow and UX* are real-shaped; the *data* is sample data and there is **no live connection**. In production this becomes scheduled polling of each church's Breeze API into a read cache (no webhooks exist; see the integration primer). Say this explicitly in the demo — the three "connected accounts" are simulated.

> See `../TITHELY-BREEZE-INTEGRATION-PRIMER.md` for the actual Breeze API surface, native integrations, and constraints this simulation is standing in for.

## Per-church subpages — deepened

Each church subpage (`#church/green-tree`, `#church/spring`, `#church/corpus`) is now a full home base for that community, not just a deeper card. Click any church on the network page (or the "Full page for X →" link inside the accordion) to see it.

Sections (top to bottom):

- **This Sunday** — next gathering pulled from the church's calendar slice + this week's bulletin headline/date/PDF link, side by side.
- **Upcoming** — calendar filtered to this church's gatherings plus All-Hive events, next four weeks.
- **Leadership** — per-church leaders from the simulated Breeze sync.
- **Recent sermons** — 3–4 recent sermons with format (video/audio), speaker, length, source, and a Watch/Listen CTA. Mock data; production wires to a YouTube channel feed, SoundCloud, or podcast RSS per church.
- **From Facebook** — a Page Plugin stand-in scoped to this church's FB page. Live version becomes Meta's iframe Page Plugin once the URL is set; demo shows the same visual frame filled with the simulated post stream.
- **Community photos** — accent-banded photo tiles (gradient stand-ins). Production wires to Instagram or a self-hosted gallery.
- **Community board** — prayer requests + announcements + welcome notes per church.
- **Give to [Church]** — primary CTA opens this church's giving fund modal (reuses the existing `FUNDS` data); secondary links to "All Hive funds" and the recurring-gift portal.

Section data lives in `SERMONS`, `BULLETIN`, `PHOTOS`, and `BOARD` near `renderDetail` — edit those to vary per-church content during a demo without touching renderer code. The Breeze calendar/leadership and FB post stream are shared with the homepage (single source of truth).

**Facebook stand-in vs. live plugin.** The demo intentionally does NOT load Meta's Facebook SDK — that would add cookies, tracking, and a runtime dependency on Facebook to a single-file mockup that otherwise has no third-party JS. The "From Facebook" section is a styled box that mimics the Page Plugin's visual frame and fills it with the simulated post stream. Production swaps the body for the real iframe:

```html
<iframe src="https://www.facebook.com/plugins/page.php?href=ENCODED_PAGE_URL&tabs=timeline&..." />
```

The stand-in's footer names the exact `FB_PAGES.<key>.url` to set when flipping a church from preview to live.

## Verse of the day

A slim band directly under the hero shows a **rotating daily Scripture**. It changes once per day and is **deterministic by date** — every visitor sees the same verse on a given day, and a new one the next day (no random flicker on reload). No backend: the day is derived from the visitor's local date and indexed into the list.

- **Weighted toward Jesus.** The list is intentionally heavy on the **words of Jesus** (~65%), with supporting verses from across the Bible (Psalms, Proverbs, the Prophets, Paul) filling the rest. Because rotation steps through the list one entry per day, that built-in weighting *is* the weighting — no separate logic needed.
- **Red-letter treatment.** Verses that are Jesus speaking render in the deep-red accent (`--corpus`) and carry a small **"The words of Jesus"** tag under the citation. Other verses render in the standard ink color with just the reference.
- **Where to edit.** The `VERSES` array near `renderVerse()` in the script. Each entry is `{ r: 'Reference', j: true|false, t: 'verse text' }` — `j:true` marks Jesus's words (red-letter). Add or reorder freely; the rotation adapts to the list length.

**Translation note (launch decision):** the wording is a recognizable, license-safe rendering for the mockup. NIV/ESV/NLT text is copyrighted and reproduction has licensing terms — pick the church's preferred translation and confirm permitted use before launch. References are stored verbatim and separately from the text, so swapping in licensed wording is a one-field edit per verse.

## Integration maps (two complementary views)

Reviewers get **two** maps, attached to the site via the "For reviewers · backend" section, the footer, and the admin **Connections** panel. They are deliberately different views — keep them consistent, but don't merge them:

1. **`../INTEGRATION-MAP.html` — Ecosystem & roles** (planning lens). Interactive: every tool grouped by the role it plays (source of truth / broadcast / two-way / media / hub), a current-vs-target toggle, click-through detail per tool, and a "Gaps & tensions" section. This is the canonical *landscape* view.
2. **`system-map.html` — Architecture & data flow** (engineering lens). The runtime read/write pipeline (Breeze → poll → cache → app → channels), the data-ownership table, the architecture-critical dependencies, and — unique to this view — a table of exactly what the prototype simulates.

**Both are maintained, not one-offs.** They must stay in sync with `../REQUIREMENTS.md` §10–§11, `../TITHELY-BREEZE-INTEGRATION-PRIMER.md`, and whatever `index.html` actually simulates — and with each other (they cross-link). When the design changes, update both and bump the **"Last reviewed"** date. The maintenance rule is also an HTML comment at the top of `system-map.html`.

## Design direction

- **Hive metaphor made visual.** Honey/amber palette, subtle hexagon pattern in the hero, hex-shaped logo mark. The name is the brand — lean into it.
- **One page, seven sections.** Hero → Mission → All-Hive banner → Three churches → Freedom Prayer → Calendar → Give → Contact → Footer. Matches their existing information architecture without the Wix clutter.
- **Mobile-first.** Responsive grids collapse cleanly; nav hides on mobile (add a hamburger at production).
- **Serif body + sans-serif UI.** Georgia body for warmth and readability; Helvetica Neue for nav, buttons, labels — a churchly-but-modern pairing.
- **Per-church color accents** (forest green / teal / deep red) on the three church cards so they're visually distinguishable without being loud.

## What I fixed from the stale site

| Stale site | Mockup |
|---|---|
| `/copy-of-give` as the calendar URL (Wix duplication artifact) | Proper `#calendar` section with placeholder for Breeze/Google Calendar embed |
| No About section | Mission → Build / Develop / Send triad with icons |
| No visual identity for the "Hive" metaphor | Hexagon logo mark + hex-field hero background + amber palette |
| All three churches visually identical | Color-banded cards; each church has its own accent |
| Wenger-era staff on Spring page | Hosts shown as "TBD — confirm" (user flagged the Wengers have moved on) |
| Bulletin as raw PDF link | Not included in this mockup; in production this belongs in the footer + a church-specific resources area |
| Corpus Christi Proton contact split from the main Gmail address | Preserved as-is — the split may be intentional; ask before consolidating |

## Placeholders to replace before launch

- **Host names** for Green Tree and The Spring (both marked `TBD — confirm`).
- **Confirm Stumbos** are still at Corpus Christi.
- **Calendar embed** — drop in Breeze, Google Calendar, or an iCal feed.
- **Contact form backend** — currently fires a JS alert; wire to Formspree, Netlify Forms, or the church's mail host.
- **Per-church live sources** — each subpage section (sermons, bulletin, photos, community board, Facebook) currently shows simulated stand-in data. Wire each church to its own YouTube channel / SoundCloud / podcast feed for sermons, a bulletin PDF or CMS, a photo gallery (Instagram or self-hosted), and a Facebook page URL. See **Per-church subpages — deepened** above for the exact swap points. Hash routes (`#church/green-tree`, etc.) may become path routes (`/green-tree`) in production if the site moves off single-file static hosting.
- **Photos** — hero is all type + pattern right now. Add real community photos when available.
- **Verse-of-the-day translation** — confirm the church's preferred Bible translation and its permitted-use terms; swap the `t:` text in the `VERSES` array (references stay as-is). See **Verse of the day** above.
- **Favicon / OG image** — not included.

## What's deliberately not here

- No JS framework, no build step. One HTML file, embedded stylesheet, and a single vanilla-JS block (no dependencies) driving the sign-in/edit demo and church sub-pages. A church should be able to hand this to any future maintainer without a toolchain.
- No CMS. If they want staff/pastors to edit content without a developer, the path is Squarespace/Wix/Webflow (client-editable) or a git-based CMS like Decap if they want version control. Flagged but not chosen.
- No blog/sermons archive. The stale site doesn't have one either; add if they want one.

## Open questions for the client

1. Do they want a CMS (self-edit) or a designer-maintained site?
2. Should per-church pages be deep (full history, leadership team, photos) or shallow (meeting details + contact)?
3. Does Corpus Christi want to stay on its own Proton-based channel, or consolidate?
4. Is DCFI affiliation still active? (Currently linked in footer — remove if stale.)
5. Sermon audio / video hosting?
6. 501(c)(3) / EIN — should it appear anywhere on the site for donor trust?
