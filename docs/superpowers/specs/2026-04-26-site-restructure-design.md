# inklet Website Restructure — Design Spec

## Overview

Restructure inklet-web from a single-page D1 marketing site into a multi-page company site with four routes: homepage (brand/vision), display (D1 product detail), store (purchase/subscribe), and portal (placeholder).

Design language remains unchanged: cream paper background `#f5f3ed`, ink text `#1a1a1a`, Newsreader/Inter/IBM Plex Mono fonts, e-ink aesthetic.

## Routing

```
/           Homepage — brand vision + product showcase
/display    Display D1 product detail page
/store      Store — D1 configurator + bundles + Portal subscription
/portal     Placeholder — "Coming Soon"
```

## Navbar

Replaces current anchor-based nav. Appears on all pages.

- **Logo**: "inklet" (Newsreader font) — links to `/`
- **Links**: Display (`/display`), Portal (disabled, gray text, "soon" superscript tooltip), Store (`/store`)
- **Mobile**: hamburger menu, same links
- **Style**: sticky, translucent with backdrop-blur on scroll (same behavior as current nav)

No Kickstarter CTA button in the navbar (moved to Store page).

## Homepage `/`

### Section 1 — Hero

Full viewport, centered layout, cream background.

- **Headline**: Newsreader, large (4xl-5xl), a vision statement about ambient information. Something like "Information should find you, not the other way around."
- **Subtext**: Inter, small, `#666`. 2-3 sentences expanding the philosophy: modern tech competes for attention, information fragmentation's answer is not to reject or accept everything uncritically, but to organize and surface information contextually.
- **No CTA button**. User scrolls naturally.

### Section 2 — Display D1

Full viewport section, light background (`#f5f3ed`).

- **Layout**: Even Realities style — large product image (right/center), text anchored left.
- **Top-left**: "inklet Display D1" title
- **Center/Right**: Large render of the D1 device (`inklet-v1-black.png`)
- **Bottom-left**: Short description (e-ink ambient display, blends into your space) + "Discover more" button linking to `/display`

### Section 3 — Portal

Full viewport section, dark background (`#1a1a1a`), creates contrast rhythm.

- **Top-left**: "inklet Portal" title (light text)
- **Center**: Abstract line-style icons representing portal capabilities (calendar, dashboard, notes)
- **Bottom-left**: Description text + "Coming Soon" label (not clickable)

### Section 4 — Footer CTA

- Tagline (e.g., "Information that finds you.")
- "Back us on Kickstarter" button (centered, links to Kickstarter)
- Footer: copyright + branding

## Display Page `/display`

Existing homepage product content moved here with a new hero.

### Section 1 — Hero
- Title: "inklet Display D1"
- Tagline: one sentence about the product
- Product image

### Section 2 — How It Works
Existing `HowItWorks` component, unchanged.

### Section 3 — 3D Showcase
Existing `Showcase3D` component (500vh scroll-driven 3D house model), unchanged.

### Section 4 — Privacy
Existing `Privacy` component, unchanged.

### Section 5 — FAQ
Existing `FAQ` component with accordion and JSON-LD, unchanged.

### Section 6 — Bottom CTA
"Get yours" button linking to `/store`.

## Store Page `/store`

### Section 1 — Early Bird Countdown + D1 Configurator

**Countdown** (above configurator, centered):
- Text: "early bird ends in" (IBM Plex Mono, 12px, `#7a6a4f`, letter-spacing wide)
- Timer: days · hrs · min · sec (IBM Plex Mono, ~24px, `#1a1a1a`)
- No background, no border — quiet text on page
- Deadline: 2026-07-31T00:00:00-07:00 (PDT)
- After expiry: shows "early bird has ended"

**D1 Configurator** (left-right split, stacks vertically on mobile):

Left — Gallery:
- Main image: large, switches based on color selection (black → `inklet-v1-black.png`, white → `inklet-v1-white.png`)
- Thumbnail row: 2 color images + 3 scene images (`inklet-v1-hallway.png`, `inklet-v1-kitchen.png`, `inklet-v1-kitchen2.png`). Click to swap main image.

Right — Configuration:
- Product name: "inklet Display D1"
- Color selector: Black / White (two swatches, selected has ring outline)
- Stand selector: Regular Stand (free) / Fridge Magnet (free) / Solid Wood Stand (+$10)
- Price display: ~~$199~~ **$179** (adjusts to $189 if wood stand selected)
- Specs block: 7.5" e-ink display · 800×480 · 2000mAh
- CTA: "Back on Kickstarter →" (full-width button, links to Kickstarter URL)

### Section 2 — Bundle Cards

Two cards side by side (stack on mobile), data from existing `BottomCTA`:

**Home Bundle**: $649 (was $749)
- 4x inklet e-ink displays
- 6 months free cloud subscription ($60)
- Cover every room
- AI-powered content routing
- Est. shipping Q4 2026

**Pro Bundle (Self-Hosted)**: $1,099 (was $1,499)
- 4x inklet e-ink displays
- 1x inklet compute hub
- Fully local, no cloud required
- All AI processing on your network
- Est. shipping Q2 2027

Both link to Kickstarter.

### Section 3 — Portal Subscription

Title: "inklet Portal"

Two pricing cards side by side:

**Monthly**: $10/mo
**Annual**: $100/yr — "Save 17%" badge

Feature list (shared): Notion, Craft & Obsidian sync, AI-powered content routing, cloud dashboard.

CTA: "Coming Soon" (disabled state, matching Portal's navbar treatment).

## Portal Page `/portal`

Minimal placeholder page:
- Title: "inklet Portal"
- Subtitle: "Coming Soon"
- Matches the dark aesthetic from the homepage Portal section

## Components to Create

- `src/app/display/page.tsx` — Display D1 product page
- `src/app/store/page.tsx` — Store page
- `src/app/portal/page.tsx` — Portal placeholder
- `src/components/HomeHero.tsx` — Vision-led hero for homepage
- `src/components/HomeDisplay.tsx` — D1 showcase section for homepage
- `src/components/HomePortal.tsx` — Portal showcase section for homepage
- `src/components/StoreConfigurator.tsx` — D1 gallery + config widget
- `src/components/StoreCountdown.tsx` — Early bird countdown timer
- `src/components/StoreBundles.tsx` — Bundle cards
- `src/components/StorePortalPricing.tsx` — Portal subscription cards
- `src/components/DisplayHero.tsx` — Hero for /display page

## Components to Modify

- `src/components/Nav.tsx` — Replace anchor links with page links (Display, Portal disabled, Store)
- `src/components/Footer.tsx` — Reuse across all pages
- `src/components/BottomCTA.tsx` — Adapt for /display page (CTA links to /store instead of Kickstarter)
- `src/app/page.tsx` — Replace with new homepage sections
- `src/app/layout.tsx` — Update metadata, keep shared layout

## Components Unchanged (moved to /display)

- `src/components/HowItWorks.tsx`
- `src/components/Showcase3D/*`
- `src/components/Privacy.tsx`
- `src/components/FAQ.tsx`
- `src/components/EInkDisplay.tsx` (used in display hero or removed if redundant)

## Data

- Kickstarter URL: `https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e`
- Early bird deadline: `2026-07-31T00:00:00-07:00`
- D1 price: $179 (original $199)
- Wood stand addon: +$10
- Portal monthly: $10/mo
- Portal annual: $100/yr
- Bundle pricing: from existing BottomCTA data
