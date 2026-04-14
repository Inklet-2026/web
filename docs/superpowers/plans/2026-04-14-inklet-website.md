# inklet Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page marketing website for inklet — a distributed e-ink display product — to drive Kickstarter pre-launch traffic.

**Architecture:** Next.js 15 App Router with Tailwind CSS 4, single `page.tsx` composing section components. Core reusable component is `<EInkDisplay />` with e-ink refresh animation. All CTAs link externally to Kickstarter. JSON-LD structured data for SEO/GEO.

**Tech Stack:** Next.js 15, Tailwind CSS 4, react-icons, framer-motion, pnpm

**Spec:** `docs/superpowers/specs/2026-04-14-inklet-website-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, Google Fonts, metadata, JSON-LD
│   ├── page.tsx                # Landing page composing all sections
│   └── globals.css             # Tailwind v4 imports + e-ink custom utilities
├── components/
│   ├── Nav.tsx                 # Fixed nav with blur-on-scroll, mobile hamburger
│   ├── Hero.tsx                # Hero: left copy + right EInkDisplay
│   ├── EInkDisplay.tsx         # Reusable e-ink device with refresh animation
│   ├── HowItWorks.tsx          # 3-step section with integration logos
│   ├── UseCases.tsx            # 4 room cards with static EInkDisplay
│   ├── Privacy.tsx             # Self-hosted / Gemma 4 section
│   ├── FAQ.tsx                 # Accordion FAQ
│   ├── BottomCTA.tsx           # Final Kickstarter CTA
│   └── Footer.tsx              # Footer with dynamic year
├── lib/
│   └── structured-data.ts      # JSON-LD generators (FAQPage, Product, Organization)
└── data/
    ├── screens.ts              # E-ink screen content for all 4 rooms
    └── faq.ts                  # FAQ Q&A data
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js project with pnpm**

```bash
cd /Users/clck/Desktop/Workspace/inklet-web
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

When prompted, accept defaults. This creates the full Next.js scaffold.

- [ ] **Step 2: Install additional dependencies**

```bash
pnpm add react-icons framer-motion
```

- [ ] **Step 3: Add `.superpowers/` to `.gitignore`**

Append to `.gitignore`:
```
# Brainstorm artifacts
.superpowers/
```

- [ ] **Step 4: Set up Google Fonts in layout.tsx**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "inklet — Your Second Brain, On Display",
  description:
    "inklet is a distributed e-ink display system that surfaces your notes, tasks, and ideas in the right room — powered by AI, with an option for fully private, local processing.",
  openGraph: {
    title: "inklet — Your Second Brain, On Display",
    description:
      "A family of e-ink displays that surface the right information in the right room — powered by AI.",
    type: "website",
    siteName: "inklet",
  },
  twitter: {
    card: "summary_large_image",
    title: "inklet — Your Second Brain, On Display",
    description:
      "A family of e-ink displays that surface the right information in the right room — powered by AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-[#f5f3ed] text-[#1a1a1a] font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Set up globals.css with Tailwind v4 and e-ink utilities**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-paper: #f5f3ed;
  --color-paper-dark: #e8e5db;
  --color-ink: #1a1a1a;
  --color-ink-light: #222;
  --color-ink-muted: #666;
  --color-ink-faint: #888;
  --color-device-frame: #2a2a2a;
  --color-eink-flash: #3a3832;
  --color-ghost-text: #c0bdb5;

  --font-newsreader: var(--font-newsreader);
  --font-inter: var(--font-inter);
  --font-ibm-plex-mono: var(--font-ibm-plex-mono);
}

/* E-ink text rendering — used inside EInkDisplay */
.eink-text {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
}

.eink-heading {
  text-shadow: 0.4px 0px 0px #222, 0px 0.4px 0px #222;
  filter: contrast(0.85) blur(0.2px);
}

.eink-body-text {
  text-shadow: 0.3px 0px 0px #444, 0px 0.3px 0px #444;
  filter: contrast(0.8) blur(0.15px);
}

.eink-label-text {
  text-shadow: 0.2px 0px 0px #888;
  filter: contrast(0.75) blur(0.2px);
}
```

- [ ] **Step 6: Create placeholder page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center h-screen">
        <h1 className="font-[family-name:var(--font-newsreader)] text-4xl">
          inklet
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
cd /Users/clck/Desktop/Workspace/inklet-web
pnpm dev
```

Open `http://localhost:3000` in browser. Verify: warm off-white background, "inklet" in Newsreader serif font centered on screen.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, fonts, and e-ink theme"
```

---

## Task 2: Data Layer

**Files:**
- Create: `src/data/screens.ts`
- Create: `src/data/faq.ts`

- [ ] **Step 1: Create screen content data**

Create `src/data/screens.ts`:

```typescript
export interface Screen {
  label: string;
  subtitle: string;
  title: string;
  detail: string;
}

export const screens: Screen[] = [
  {
    label: "kitchen",
    subtitle: "Today's Menu",
    title: "Honey Garlic\nSalmon Bowl",
    detail: "prep 15 min · cook 20 min · serves 2",
  },
  {
    label: "study",
    subtitle: "Focus — 3 tasks remaining",
    title: "Ship landing page\nby Friday",
    detail: "next: review PR #42 · standup at 2pm",
  },
  {
    label: "hallway",
    subtitle: "Wednesday, April 14",
    title: "72°F Sunny",
    detail: "dentist 10:30am · pick up dry cleaning · yoga 6pm",
  },
  {
    label: "bedroom",
    subtitle: "Good morning",
    title: "You slept 7h 42m",
    detail: '"the secret of getting ahead is getting started"',
  },
];
```

- [ ] **Step 2: Create FAQ data**

Create `src/data/faq.ts`:

```typescript
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is inklet?",
    answer:
      "inklet is a distributed e-ink display system for your home. It surfaces information from your notes, tasks, and apps on dedicated screens around your house — organized automatically by AI.",
  },
  {
    question: "How does the AI know where to put my content?",
    answer:
      "inklet's on-device AI analyzes what you save and categorizes it by context — work, cooking, schedule, wellness. Each display is assigned to a room, and content routes there automatically.",
  },
  {
    question: "What apps does inklet sync with?",
    answer:
      "inklet syncs with Notion, Craft, and Obsidian out of the box. You can also send content directly from your phone or computer. More integrations are on the roadmap.",
  },
  {
    question: "Does inklet require an internet connection?",
    answer:
      "Not with the self-hosted hub. The Gemma 4-powered compute unit processes everything locally on your home network. The cloud version is available for those who prefer it.",
  },
  {
    question: "What size are the displays?",
    answer:
      "The launch model features a 7.5-inch e-paper display — the same technology used in e-readers. Crisp, paper-like, and easy on the eyes.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Months on a single charge. E-ink only draws power when the screen refreshes, so inklet sips energy instead of draining it.",
  },
  {
    question: "Is my data sent to the cloud?",
    answer:
      "Only if you choose the cloud option. With the self-hosted hub, all data stays on your local network. Nothing leaves your home.",
  },
  {
    question: "When will inklet be available?",
    answer:
      "We're launching on Kickstarter soon. Back us on our pre-launch page to get notified the moment we go live.",
  },
  {
    question: "Can I build custom screens or plugins?",
    answer:
      "Yes. A developer SDK is on our roadmap, so you can create custom layouts and data sources for your displays.",
  },
  {
    question: "How is inklet different from other e-ink displays?",
    answer:
      "inklet is multi-display and AI-routed. Instead of one screen showing one dashboard, inklet distributes the right content to the right room — automatically. Plus, it's the only system offering fully local, private AI processing.",
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/data/screens.ts src/data/faq.ts
git commit -m "feat: add screen content and FAQ data"
```

---

## Task 3: EInkDisplay Component

**Files:**
- Create: `src/components/EInkDisplay.tsx`

This is the core reusable component. It renders the e-ink device mockup with optional animated content rotation and the e-ink refresh effect (v7 animation with updated timing).

- [ ] **Step 1: Create EInkDisplay component**

Create `src/components/EInkDisplay.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Screen } from "@/data/screens";

interface EInkDisplayProps {
  screens: Screen[];
  animated?: boolean;
  interval?: number;
  initialIndex?: number;
  showDots?: boolean;
  showLabel?: boolean;
}

export default function EInkDisplay({
  screens,
  animated = true,
  interval = 5000,
  initialIndex = 0,
  showDots = true,
  showLabel = true,
}: EInkDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(true);
  const [ghostContent, setGhostContent] = useState<Screen | null>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const current = screens[currentIndex];

  const setFlash = useCallback(
    (opacity: number, duration: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!flashRef.current) return resolve();
        flashRef.current.style.transition = `opacity ${duration}ms ease`;
        flashRef.current.style.opacity = String(opacity);
        setTimeout(resolve, duration);
      });
    },
    []
  );

  const wait = useCallback(
    (ms: number) => new Promise<void>((r) => setTimeout(r, ms)),
    []
  );

  const einkRefresh = useCallback(
    async (nextIndex: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const totalFlashes = Math.random() < 0.5 ? 1 : 2;

      // Show ghost of current content
      setGhostContent(screens[currentIndex]);
      if (ghostRef.current) {
        ghostRef.current.style.transition = "none";
        ghostRef.current.style.opacity = "0.5";
      }

      // Hide current content
      setIsVisible(false);

      if (totalFlashes === 1) {
        // 1 flash: ~300ms flash + ~700ms ghost = ~1s
        await setFlash(1, 80);
        await wait(60);
        setCurrentIndex(nextIndex);
        setIsVisible(true);
        await setFlash(0, 120);
        await wait(20);
        if (ghostRef.current) {
          ghostRef.current.style.transition = "opacity 700ms ease-out";
          ghostRef.current.style.opacity = "0";
        }
      } else {
        // 2 flashes: ~500ms flash + ~500ms ghost = ~1s
        await setFlash(1, 70);
        await wait(30);
        await setFlash(0.15, 70);
        await wait(30);
        await setFlash(1, 70);
        await wait(40);
        setCurrentIndex(nextIndex);
        setIsVisible(true);
        await setFlash(0, 100);
        await wait(20);
        if (ghostRef.current) {
          ghostRef.current.style.transition = "opacity 500ms ease-out";
          ghostRef.current.style.opacity = "0";
        }
      }

      await wait(totalFlashes === 1 ? 700 : 500);
      setGhostContent(null);
      isAnimating.current = false;
    },
    [currentIndex, screens, setFlash, wait]
  );

  useEffect(() => {
    if (!animated || screens.length <= 1) return;
    const timer = setInterval(() => {
      const next = (currentIndex + 1) % screens.length;
      einkRefresh(next);
    }, interval);
    return () => clearInterval(timer);
  }, [animated, screens.length, interval, currentIndex, einkRefresh]);

  return (
    <div className="w-full max-w-[620px]">
      {/* Device frame */}
      <div className="relative bg-[#2a2a2a] rounded-2xl p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]">
        {/* Bezel */}
        <div className="relative bg-[#e8e5db] rounded-md overflow-hidden aspect-video">
          {/* Paper grain texture */}
          <div
            className="absolute inset-0 z-[10] pointer-events-none opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Pixel grid overlay */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.012) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          {/* Flash overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0 z-[6] pointer-events-none opacity-0"
            style={{ background: "#3a3832" }}
          />

          {/* Ghost layer — old content text */}
          <div
            ref={ghostRef}
            className="absolute inset-0 z-[4] pointer-events-none opacity-0 flex items-center justify-center p-10"
          >
            {ghostContent && (
              <div className="text-center eink-text">
                <span className="font-[family-name:var(--font-inter)] font-medium text-[11px] tracking-[3px] uppercase text-[#ccc9c0] mb-5 block" style={{ filter: "contrast(0.4) blur(0.5px)" }}>
                  {ghostContent.subtitle}
                </span>
                <div className="font-[family-name:var(--font-newsreader)] text-[32px] md:text-[38px] text-[#c0bdb5] leading-tight mb-4 whitespace-pre-line" style={{ filter: "contrast(0.5) blur(0.6px)" }}>
                  {ghostContent.title}
                </div>
                <div className="w-9 h-[1.5px] bg-[#d5d2c9] mx-auto my-3.5" style={{ filter: "blur(0.3px)" }} />
                <div className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] md:text-[14px] text-[#ccc9c0]" style={{ filter: "contrast(0.4) blur(0.5px)" }}>
                  {ghostContent.detail}
                </div>
              </div>
            )}
          </div>

          {/* Screen content */}
          <div className="relative w-full h-full flex items-center justify-center p-10">
            <div
              className={`text-center eink-text transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <span className="font-[family-name:var(--font-inter)] font-medium text-[11px] tracking-[3px] uppercase text-[#888] mb-5 block eink-label-text">
                {current.subtitle}
              </span>
              <div className="font-[family-name:var(--font-newsreader)] text-[32px] md:text-[38px] text-[#222] leading-tight mb-4 whitespace-pre-line eink-heading">
                {current.title}
              </div>
              <div className="w-9 h-[1.5px] bg-[#bbb] mx-auto my-3.5" style={{ filter: "blur(0.3px)" }} />
              <div className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] md:text-[14px] text-[#444] tracking-wide leading-relaxed eink-body-text">
                {current.detail}
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          {showDots && screens.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[12]">
              {screens.map((_, i) => (
                <div
                  key={i}
                  className={`w-[5px] h-[5px] rounded-full transition-colors duration-300 ${i === currentIndex ? "bg-[#666]" : "bg-[#ccc]"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* LED indicator */}
        <div className="absolute bottom-1.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#444]" />
      </div>

      {/* Room label */}
      {showLabel && (
        <p className="mt-6 text-xs text-[#aaa] text-center font-[family-name:var(--font-ibm-plex-mono)]">
          — {current.label} —
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Smoke test — render EInkDisplay on page**

Temporarily update `src/app/page.tsx`:

```tsx
import EInkDisplay from "@/components/EInkDisplay";
import { screens } from "@/data/screens";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <EInkDisplay screens={screens} />
    </main>
  );
}
```

Run `pnpm dev`, open `http://localhost:3000`. Verify:
- Dark device frame with warm bezel
- Content rotates every 5s
- E-ink flash animation: 1 or 2 flashes, ghost old text visible after flash clears, fades out
- Dot indicators update
- Room label changes

- [ ] **Step 3: Commit**

```bash
git add src/components/EInkDisplay.tsx src/app/page.tsx
git commit -m "feat: add EInkDisplay component with e-ink refresh animation"
```

---

## Task 4: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create Nav component**

Create `src/components/Nav.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f5f3ed]/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo placeholder */}
        <a
          href="#"
          className="font-[family-name:var(--font-newsreader)] text-xl text-[#1a1a1a] tracking-wide"
        >
          inklet
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border border-[#1a1a1a] text-[#1a1a1a] px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
          >
            Back us on Kickstarter
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#1a1a1a]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f3ed]/95 backdrop-blur-md border-t border-[#e8e5db] px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-[#666] hover:text-[#1a1a1a]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-center border border-[#1a1a1a] text-[#1a1a1a] px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
          >
            Back us on Kickstarter
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component with blur-on-scroll and mobile menu"
```

---

## Task 5: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
import EInkDisplay from "@/components/EInkDisplay";
import { screens } from "@/data/screens";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        {/* Left: Copy */}
        <div>
          <h1 className="font-[family-name:var(--font-newsreader)] text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] leading-[1.1] mb-6">
            Your second brain,
            <br />
            on display.
          </h1>
          <p className="text-lg text-[#666] leading-relaxed max-w-lg mb-10">
            inklet is a family of e-ink displays that surface the right
            information in the right room — powered by AI, synced from the tools
            you already use. No glowing screens. No pings. Just clarity,
            everywhere.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Back us on Kickstarter
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-6 py-3 text-[#666] text-sm hover:text-[#1a1a1a] transition-colors"
            >
              Learn more ↓
            </a>
          </div>
        </div>

        {/* Right: E-ink device */}
        <div className="flex justify-center lg:justify-end">
          <EInkDisplay screens={screens} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with copy and EInkDisplay"
```

---

## Task 6: HowItWorks Component

**Files:**
- Create: `src/components/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks component**

Create `src/components/HowItWorks.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { SiNotion, SiObsidian } from "react-icons/si";
import { HiOutlineDocumentText } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Capture from anywhere",
    description:
      "Send a note, save a recipe, clip a task — from your phone, your laptop, or straight from Notion, Craft, and Obsidian. inklet meets you where your ideas already live.",
    icons: true,
  },
  {
    number: "02",
    title: "AI sorts it for you",
    description:
      "Our on-device AI reads what you saved and figures out where it belongs. Work tasks route to your study. Recipes land in the kitchen. You never have to organize a thing.",
    icons: false,
  },
  {
    number: "03",
    title: "It just appears",
    description:
      "No notification. No buzz. The right screen quietly updates with exactly what you need, when you need it. e-ink means no backlight, no eye strain — it sits in your space like a picture frame, not a gadget.",
    icons: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20"
        >
          Three steps to calm clarity.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#aaa] tracking-wider">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {step.title}
              </h3>
              <p className="text-[#666] leading-relaxed text-[15px]">
                {step.description}
              </p>
              {step.icons && (
                <div className="flex items-center gap-4 mt-6 text-[#999]">
                  <SiNotion size={20} title="Notion" />
                  <HiOutlineDocumentText size={22} title="Craft" />
                  <SiObsidian size={20} title="Obsidian" />
                  <span className="text-xs text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)]">
                    + more
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "feat: add HowItWorks section with 3-step flow and integration icons"
```

---

## Task 7: UseCases Component

**Files:**
- Create: `src/components/UseCases.tsx`

- [ ] **Step 1: Create UseCases component**

Create `src/components/UseCases.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import EInkDisplay from "@/components/EInkDisplay";
import type { Screen } from "@/data/screens";
import { screens as allScreens } from "@/data/screens";

const useCases = [
  {
    tagline: "Tonight's dinner, at a glance",
    description:
      "Recipes, grocery lists, meal plans — right where you cook.",
  },
  {
    tagline: "Your focus list, front and center",
    description: "Tasks, deadlines, meeting notes — no phone required.",
  },
  {
    tagline: "Weather, calendar, family schedule",
    description: "The household dashboard everyone walks past.",
  },
  {
    tagline: "Wake up to what matters",
    description: "Sleep data, morning briefing, daily intention.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function UseCases() {
  return (
    <section id="use-cases" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20"
        >
          One brain, every room.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {useCases.map((useCase, i) => (
            <motion.div
              key={allScreens[i].label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <EInkDisplay
                screens={[allScreens[i]]}
                animated={false}
                showDots={false}
                showLabel={false}
              />
              <div className="mt-6">
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#aaa] uppercase tracking-[3px]">
                  {allScreens[i].label}
                </span>
                <h3 className="font-[family-name:var(--font-newsreader)] text-xl mt-2 mb-2">
                  {useCase.tagline}
                </h3>
                <p className="text-[#666] text-sm">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/UseCases.tsx
git commit -m "feat: add UseCases section with 4 room cards"
```

---

## Task 8: Privacy Component

**Files:**
- Create: `src/components/Privacy.tsx`

- [ ] **Step 1: Create Privacy component**

Create `src/components/Privacy.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineServer, HiOutlineWifi, HiOutlineCode } from "react-icons/hi";

const points = [
  { icon: HiOutlineWifi, text: "Self-hosted on your LAN" },
  { icon: HiOutlineServer, text: "Gemma 4 on-device AI" },
  { icon: HiOutlineShieldCheck, text: "No cloud dependency" },
  { icon: HiOutlineCode, text: "Open-source friendly" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Privacy() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-8"
        >
          Your thoughts stay yours.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-lg text-[#666] leading-relaxed max-w-2xl mx-auto mb-16"
        >
          inklet offers a local compute hub powered by Gemma 4 — every note,
          every query, every AI decision processed entirely on your home
          network. No cloud. No data leaves your walls. For families and
          professionals who believe privacy isn&apos;t a feature — it&apos;s a
          right.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {points.map((point) => (
            <div key={point.text} className="flex flex-col items-center gap-3">
              <point.icon className="text-[#888]" size={28} />
              <span className="text-sm text-[#666]">{point.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Privacy.tsx
git commit -m "feat: add Privacy section with self-hosted highlights"
```

---

## Task 9: FAQ Component

**Files:**
- Create: `src/components/FAQ.tsx`

- [ ] **Step 1: Create FAQ component with accordion and JSON-LD**

Create `src/components/FAQ.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { faqItems } from "@/data/faq";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function FAQAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e8e5db]">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h3 className="font-[family-name:var(--font-newsreader)] text-lg text-[#1a1a1a]">
          {question}
        </h3>
        {open ? (
          <HiOutlineMinus className="shrink-0 text-[#aaa]" size={18} />
        ) : (
          <HiOutlinePlus className="shrink-0 text-[#aaa]" size={18} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[#666] text-[15px] leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-16"
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          {faqItems.map((item) => (
            <FAQAccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQ.tsx
git commit -m "feat: add FAQ accordion with JSON-LD structured data"
```

---

## Task 10: BottomCTA and Footer Components

**Files:**
- Create: `src/components/BottomCTA.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create BottomCTA component**

Create `src/components/BottomCTA.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BottomCTA() {
  return (
    <section className="py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-6">
          Ready to think out loud?
        </h2>
        <p className="text-lg text-[#666] mb-10">
          Be the first to back inklet on Kickstarter.
        </p>
        <a
          href={KICKSTARTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
        >
          Back us on Kickstarter →
        </a>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-[#e8e5db] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo placeholder */}
        <span className="font-[family-name:var(--font-newsreader)] text-lg text-[#1a1a1a]">
          inklet
        </span>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[#aaa]">
          <a href="#" className="hover:text-[#666] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#666] transition-colors">
            Terms
          </a>
        </div>

        {/* Copyright */}
        <span className="text-sm text-[#aaa]">
          © {new Date().getFullYear()} inklet
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BottomCTA.tsx src/components/Footer.tsx
git commit -m "feat: add BottomCTA and Footer components"
```

---

## Task 11: Structured Data

**Files:**
- Create: `src/lib/structured-data.ts`

- [ ] **Step 1: Create structured data helpers**

Create `src/lib/structured-data.ts`:

```typescript
export function getProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "inklet",
    description:
      "A distributed e-ink display system that surfaces your notes, tasks, and ideas in the right room — powered by AI.",
    brand: {
      "@type": "Brand",
      name: "inklet",
    },
    category: "Smart Home Display",
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "inklet",
    description:
      "Makers of distributed e-ink displays powered by AI.",
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/structured-data.ts
git commit -m "feat: add Product and Organization JSON-LD helpers"
```

---

## Task 12: Assemble Page and Final Integration

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Assemble all sections in page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Privacy from "@/components/Privacy";
import FAQ from "@/components/FAQ";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <UseCases />
        <Privacy />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add structured data to layout.tsx**

Add structured data script tags to the `<body>` in `src/app/layout.tsx`, after `{children}`:

```tsx
import { getProductJsonLd, getOrganizationJsonLd } from "@/lib/structured-data";

// ... existing code ...

// Inside the <body> tag, after {children}:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(getProductJsonLd()),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(getOrganizationJsonLd()),
  }}
/>
```

- [ ] **Step 3: Full visual verification**

Run `pnpm dev`, open `http://localhost:3000`. Walk through the full page:

1. **Nav**: fixed, transparent → blurred on scroll, mobile hamburger works
2. **Hero**: left copy + right e-ink device animating, CTA buttons present
3. **How it Works**: 3 steps with fade-up on scroll, integration icons on step 1
4. **Use Cases**: 4 cards with static e-ink devices, room labels
5. **Privacy**: centered copy + 4 icon points
6. **FAQ**: accordion opens/closes, all 10 questions present
7. **Bottom CTA**: heading + Kickstarter button
8. **Footer**: logo, links, dynamic year
9. **Responsive**: resize browser to mobile width, verify stacking

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: assemble full landing page with all sections and structured data"
```

---

## Task 13: SEO Files

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create robots.ts**

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://inklet.com/sitemap.xml",
  };
}
```

- [ ] **Step 2: Create sitemap.ts**

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://inklet.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "feat: add robots.txt and sitemap.xml generation"
```

---

## Task 14: Build Verification

- [ ] **Step 1: Run production build**

```bash
cd /Users/clck/Desktop/Workspace/inklet-web
pnpm build
```

Expected: Build completes with no errors. Check for any TypeScript or ESLint warnings.

- [ ] **Step 2: Fix any build errors**

If there are errors, fix them and re-run `pnpm build`.

- [ ] **Step 3: Start production server and test**

```bash
pnpm start
```

Open `http://localhost:3000`. Quick check:
- Page loads without JS errors in console
- E-ink animation runs
- All sections render
- View page source: JSON-LD scripts present for FAQPage, Product, Organization

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues"
```
