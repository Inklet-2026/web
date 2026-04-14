# inklet Website Design Spec

## Overview

inklet is a distributed e-ink display dashboard product launching on Kickstarter. This spec covers the marketing/landing website — a single-page site designed to build brand awareness and drive traffic to the Kickstarter Pre-Launch page.

**Goal**: Brand hype + Kickstarter Pre-Launch redirect
**Target audience**: American consumers interested in smart home, productivity, privacy
**Design references**: trmnl.com (minimal e-ink aesthetic), acimo.ai (clean product storytelling)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: react-icons
- **Package manager**: pnpm
- **Animation**: framer-motion (scroll animations)
- **Deployment**: TBD (Vercel recommended)

## Visual Identity

### Color Palette

- **Background**: `#f5f3ed` (warm off-white, paper-like)
- **Text primary**: `#1a1a1a` / `#222`
- **Text secondary**: `#666`
- **Text muted**: `#888` / `#aaa`
- **E-ink bezel**: `#e8e5db`
- **Device frame**: `#2a2a2a`
- **E-ink flash**: `#3a3832` (warm dark grey)
- **Dividers/borders**: `#ccc` / `#bbb`

### Typography

- **Headings**: Newsreader (serif) — evokes e-ink reading quality
- **Body/mono**: IBM Plex Mono — technical, clean, e-ink label feel
- **UI/labels**: Inter — clean sans-serif for navigation and small text

### Design Principles

- The entire website feels like an e-ink surface — warm, papery, low-contrast
- No bright colors, no gradients, no glossy effects
- E-ink text rendering: `font-smoothing: none`, slight `text-shadow` stroke thickening, `contrast()` and `blur()` filters to reduce sharpness
- Pixel grid overlay on e-ink screen areas (3px CSS grid)
- Logo and branding: placeholder for now

## Page Structure (Single Page)

### 1. Navigation

- Fixed top bar, transparent background, `backdrop-blur` on scroll
- Left: logo placeholder
- Right: anchor links — "How it Works" / "Use Cases" / "FAQ"
- Right CTA: "Back us on Kickstarter" → external link to Kickstarter Pre-Launch page
- Mobile: hamburger menu

### 2. Hero Section

**Layout**: Left text + right e-ink device mockup

**E-ink device component (`<EInkDisplay />`)**:
- Dark frame (`#2a2a2a`) with rounded corners, subtle shadow
- Inner bezel (`#e8e5db`) with paper grain texture (SVG noise filter) and pixel grid overlay
- Content rotates every 5 seconds with e-ink refresh animation
- 4 screen scenes: kitchen (recipe), study (tasks), hallway (weather/calendar), bedroom (sleep/quote)
- Dot indicators at bottom of screen + room label below device

**E-ink refresh animation (v7 — confirmed)**:
- Single flash overlay layer (z-index 6) + ghost text layer (z-index 4)
- 1 or 2 total flashes (random 50/50)
- Flash uses `#3a3832` at `opacity: 1` — fully covers ghost during flash
- After flash clears: new content appears, ghost (old text content, faded) visible on top, fades out over remaining time
- 1-flash path: ~550ms flash + ~1450ms ghost fade = ~2s total
- 2-flash path: ~750ms flash + ~1250ms ghost fade = ~2s total
- Ghost text styled: lighter color (#c0bdb5), no text-shadow, `blur(0.6px)`, `contrast(0.5)`

**Copy**:
```
Your second brain, on display.

inklet is a family of e-ink displays that surface the right information
in the right room — powered by AI, synced from the tools you already use.
No glowing screens. No pings. Just clarity, everywhere.

[Back us on Kickstarter]  [Learn more ↓]
```

### 3. How It Works

**Title**: "Three steps to calm clarity."

**Step 1 — Capture from anywhere**
> Send a note, save a recipe, clip a task — from your phone, your laptop, or straight from Notion, Craft, and Obsidian. inklet meets you where your ideas already live.

Integration logos (Notion, Craft, Obsidian) displayed inline in this step.

**Step 2 — AI sorts it for you**
> Our on-device AI reads what you saved and figures out where it belongs. Work tasks route to your study. Recipes land in the kitchen. You never have to organize a thing.

**Step 3 — It just appears**
> No notification. No buzz. The right screen quietly updates with exactly what you need, when you need it. e-ink means no backlight, no eye strain — it sits in your space like a picture frame, not a gadget.

**Three key messaging pillars woven through these steps**:
1. **Second brain display** — Step 1 (your knowledge, surfaced)
2. **AI feature** — Step 2 (intelligent routing)
3. **Won't disturb you** — Step 3 (calm, ambient, no notifications)

### 4. Use Cases

**Title**: "One brain, every room."

4 cards, each with a static e-ink screen mockup + short description:

| Room | Tagline | Description |
|------|---------|-------------|
| Kitchen | "Tonight's dinner, at a glance" | Recipes, grocery lists, meal plans — right where you cook |
| Study | "Your focus list, front and center" | Tasks, deadlines, meeting notes — no phone required |
| Hallway | "Weather, calendar, family schedule" | The household dashboard everyone walks past |
| Bedroom | "Wake up to what matters" | Sleep data, morning briefing, daily intention |

Each card reuses the `<EInkDisplay />` component in static mode (no animation, just showing one screen). Product images to be replaced with renders later.

### 5. Privacy & Self-Hosted

**Title**: "Your thoughts stay yours."

**Copy**:
> inklet offers a local compute hub powered by Gemma 4 — every note, every query, every AI decision processed entirely on your home network. No cloud. No data leaves your walls. For families and professionals who believe privacy isn't a feature — it's a right.

**Key points** (icon + short line each):
- Self-hosted on your LAN
- Gemma 4 on-device AI
- No cloud dependency
- Open-source friendly

### 6. FAQ (SEO/GEO Optimized)

Accordion-style expandable Q&A. Wrapped in `schema.org/FAQPage` JSON-LD structured data for search engines and AI answer engines.

**Questions**:

1. **What is inklet?**
   inklet is a distributed e-ink display system for your home. It surfaces information from your notes, tasks, and apps on dedicated screens around your house — organized automatically by AI.

2. **How does the AI know where to put my content?**
   inklet's on-device AI analyzes what you save and categorizes it by context — work, cooking, schedule, wellness. Each display is assigned to a room, and content routes there automatically.

3. **What apps does inklet sync with?**
   inklet syncs with Notion, Craft, and Obsidian out of the box. You can also send content directly from your phone or computer. More integrations are on the roadmap.

4. **Does inklet require an internet connection?**
   Not with the self-hosted hub. The Gemma 4-powered compute unit processes everything locally on your home network. The cloud version is available for those who prefer it.

5. **What size are the displays?**
   The launch model features a 7.5-inch e-paper display — the same technology used in e-readers. Crisp, paper-like, and easy on the eyes.

6. **How long does the battery last?**
   Months on a single charge. E-ink only draws power when the screen refreshes, so inklet sips energy instead of draining it.

7. **Is my data sent to the cloud?**
   Only if you choose the cloud option. With the self-hosted hub, all data stays on your local network. Nothing leaves your home.

8. **When will inklet be available?**
   We're launching on Kickstarter soon. Back us on our pre-launch page to get notified the moment we go live.

9. **Can I build custom screens or plugins?**
   Yes. A developer SDK is on our roadmap, so you can create custom layouts and data sources for your displays.

10. **How is inklet different from other e-ink displays?**
    inklet is multi-display and AI-routed. Instead of one screen showing one dashboard, inklet distributes the right content to the right room — automatically. Plus, it's the only system offering fully local, private AI processing.

### 7. Bottom CTA

**Copy**:
```
Ready to think out loud?

Be the first to back inklet on Kickstarter.

[Back us on Kickstarter →]
```

Single button, links to Kickstarter Pre-Launch page. No email input.

### 8. Footer

- Logo placeholder (left)
- Social links placeholder
- `© {currentYear} inklet` — year dynamically generated
- Privacy / Terms links (placeholder)

## SEO Strategy

### Technical SEO
- Next.js `metadata` API for title, description, Open Graph, Twitter cards
- `robots.txt` and `sitemap.xml` generated
- Semantic HTML: proper heading hierarchy (single H1 in hero, H2 per section, H3 for FAQ questions)
- Image alt texts on all product images/mockups

### Meta Tags
- **Title**: "inklet — Your Second Brain, On Display"
- **Description**: "inklet is a distributed e-ink display system that surfaces your notes, tasks, and ideas in the right room — powered by AI, with an option for fully private, local processing."
- **OG Image**: Product hero shot (placeholder for now)

### Structured Data (JSON-LD)
- `FAQPage` schema on FAQ section
- `Product` schema with name, description, brand
- `Organization` schema in footer

### GEO (Generative Engine Optimization)
- FAQ content written in natural conversational Q&A format
- Questions phrased as real user queries ("How does the AI know...", "Does inklet require...")
- Answers are self-contained paragraphs that AI engines can extract directly
- Comparison question included ("How is inklet different...") for competitive queries

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main landing page (all sections)
│   └── globals.css         # Tailwind imports + e-ink custom styles
├── components/
│   ├── Nav.tsx             # Fixed navigation bar
│   ├── Hero.tsx            # Hero section with text + device
│   ├── EInkDisplay.tsx     # Reusable e-ink device mockup
│   │                         Props: screens[], animated (bool), interval (ms)
│   ├── HowItWorks.tsx      # 3-step section
│   ├── UseCases.tsx        # Room cards with static EInkDisplay
│   ├── Privacy.tsx         # Self-hosted / Gemma 4 section
│   ├── FAQ.tsx             # Accordion FAQ with JSON-LD
│   ├── BottomCTA.tsx       # Final call-to-action
│   └── Footer.tsx          # Footer with dynamic year
├── lib/
│   └── structured-data.ts  # JSON-LD generation helpers
└── data/
    ├── screens.ts          # E-ink screen content data
    └── faq.ts              # FAQ questions and answers
```

### EInkDisplay Component Interface

```typescript
interface EInkDisplayProps {
  screens: Screen[];        // Content screens to display
  animated?: boolean;       // Enable auto-rotation with e-ink refresh (default: true)
  interval?: number;        // Rotation interval in ms (default: 5000)
  initialIndex?: number;    // Starting screen index (default: 0)
  showDots?: boolean;       // Show dot indicators (default: true)
  showLabel?: boolean;      // Show room label below device (default: true)
}

interface Screen {
  label: string;            // Room name (e.g. "kitchen")
  title: string;            // Main heading
  subtitle: string;         // Category/label text
  detail: string;           // Bottom detail text
}
```

## CTA Strategy

All CTAs link externally to the Kickstarter Pre-Launch page.

| Location | CTA Text | Style |
|----------|----------|-------|
| Nav | "Back us on Kickstarter" | Outlined button |
| Hero (primary) | "Back us on Kickstarter" | Solid dark button |
| Hero (secondary) | "Learn more ↓" | Text link, scrolls to How it Works |
| Bottom | "Back us on Kickstarter →" | Large solid button |

## Responsive Design

- **Desktop** (>1024px): Side-by-side hero, 4-column use case cards
- **Tablet** (768-1024px): Stacked hero, 2-column cards
- **Mobile** (<768px): Full-width stacked, hamburger nav, smaller e-ink device

## Out of Scope

- Actual waitlist/email collection (using Kickstarter Pre-Launch instead)
- Pricing page
- Team/about page
- Blog
- User accounts / dashboard
- E-commerce / checkout
