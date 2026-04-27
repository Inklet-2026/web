# Site Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform inklet-web from a single-page marketing site into a multi-page company site with four routes (/, /display, /store, /portal), a new navbar, and restructured content.

**Architecture:** Next.js App Router file-system routing. Nav and Footer move to the root layout so they're shared across all pages. Existing product components (HowItWorks, Showcase3D, Privacy, FAQ) move unchanged to /display. New homepage gets vision-led hero + product showcase sections. Store page gets a product configurator, bundle cards, and subscription pricing.

**Tech Stack:** Next.js 16 (App Router), React 19, Framer Motion, Tailwind CSS 4, TypeScript

**Spec:** `docs/superpowers/specs/2026-04-26-site-restructure-design.md`

**No test framework is set up** — this is a marketing site. Verification is done via `npx tsc --noEmit` type-checking and visual inspection in the dev server.

---

### Task 1: Move Nav and Footer into root layout

Currently each page renders its own `<Nav />` and `<Footer />`. Move them into `layout.tsx` so all routes share them.

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update layout.tsx to include Nav and Footer**

```tsx
// src/app/layout.tsx — add imports at top
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// In the body, wrap {children} with Nav and Footer:
<body className="bg-[#f5f3ed] text-[#1a1a1a] font-[family-name:var(--font-inter)] antialiased">
  <Nav />
  <main>{children}</main>
  <Footer />
  {/* JSON-LD scripts stay where they are */}
</body>
```

- [ ] **Step 2: Remove Nav and Footer from page.tsx**

```tsx
// src/app/page.tsx — remove Nav, Footer imports and usage
// Remove: import Nav from "@/components/Nav";
// Remove: import Footer from "@/components/Footer";
// Remove: <Nav /> and <Footer /> from JSX
// Remove the <main> wrapper (layout now provides it)
// Keep all other component imports and renders as-is
```

The page becomes:
```tsx
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Showcase3D from "@/components/Showcase3D";
import Privacy from "@/components/Privacy";
import FAQ from "@/components/FAQ";
import BottomCTA from "@/components/BottomCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Showcase3D />
      <Privacy />
      <FAQ />
      <BottomCTA />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "refactor: move Nav and Footer into root layout"
```

---

### Task 2: Update Nav component

Replace anchor-based section links with page route links. Add disabled Portal link.

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Rewrite Nav.tsx**

Replace the entire file contents:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navLinks = [
  { label: "Display", href: "/display" },
  { label: "Store", href: "/store" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f5f3ed]/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-newsreader)] text-xl text-[#1a1a1a] tracking-wide"
        >
          inklet
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-[#1a1a1a]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="text-sm text-[#bbb] cursor-default select-none">
            Portal
            <sup className="text-[10px] ml-0.5 text-[#aaa]">soon</sup>
          </span>
        </div>

        <button
          className="md:hidden text-[#1a1a1a]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#f5f3ed]/95 backdrop-blur-md border-t border-[#e8e5db] px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm ${
                pathname === link.href
                  ? "text-[#1a1a1a]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="block text-sm text-[#bbb]">
            Portal
            <sup className="text-[10px] ml-0.5 text-[#aaa]">soon</sup>
          </span>
        </div>
      )}
    </nav>
  );
}
```

Key changes:
- `<a href="#section">` → `<Link href="/route">`
- Kickstarter CTA button removed from nav
- Portal shown as disabled `<span>` with "soon" superscript
- Active route highlighted via `usePathname()`
- Menu auto-closes on route change

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: update navbar with page route links"
```

---

### Task 3: Build new homepage

Create three new homepage section components and rewrite page.tsx.

**Files:**
- Create: `src/components/HomeHero.tsx`
- Create: `src/components/HomeDisplay.tsx`
- Create: `src/components/HomePortal.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HomeHero.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HomeHero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-8"
        >
          Information should find you,
          <br />
          not the other way around.
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.8, delay: 0.2 } } }}
          className="text-[#666] text-base md:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Modern technology competes for your attention. We believe the answer to
          information fragmentation isn't to reject everything or accept it all
          uncritically — it's to organize and surface what matters, right where
          you need it.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create HomeDisplay.tsx**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomeDisplay() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="order-2 lg:order-1"
        >
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-6">
            inklet Display D1
          </h2>
          <p className="text-[#666] leading-relaxed mb-8 max-w-md">
            An e-ink ambient display that blends into your space. No glowing
            screens, no notifications — just the right information, quietly
            appearing where you need it.
          </p>
          <Link
            href="/display"
            className="inline-flex items-center text-sm text-[#1a1a1a] border border-[#1a1a1a] px-6 py-3 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
          >
            Discover more →
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="order-1 lg:order-2 flex justify-center"
        >
          <Image
            src="/inklet-v1-black.png"
            alt="inklet Display D1"
            width={600}
            height={450}
            className="w-full max-w-lg"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create HomePortal.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlinePencilAlt,
} from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const icons = [
  { Icon: HiOutlineCalendar, label: "Schedule" },
  { Icon: HiOutlineChartBar, label: "Dashboard" },
  { Icon: HiOutlinePencilAlt, label: "Notes" },
];

export default function HomePortal() {
  return (
    <section className="min-h-screen flex items-center bg-[#1a1a1a] text-[#f5f3ed]">
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-16"
        >
          inklet Portal
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex justify-center gap-20 mb-20"
        >
          {icons.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <Icon size={32} className="text-[#666]" />
              <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-md"
        >
          <p className="text-[#888] leading-relaxed mb-6">
            Your cloud dashboard for ambient life. Manage what appears on your
            displays, sync with the tools you already use, and let AI handle the
            rest.
          </p>
          <span className="inline-flex items-center text-sm text-[#555] border border-[#333] px-6 py-3 rounded-full cursor-default select-none">
            Coming Soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite page.tsx**

```tsx
import HomeHero from "@/components/HomeHero";
import HomeDisplay from "@/components/HomeDisplay";
import HomePortal from "@/components/HomePortal";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeDisplay />
      <HomePortal />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Information that finds you.
          </p>
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Back us on Kickstarter →
          </a>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/components/HomeHero.tsx src/components/HomeDisplay.tsx src/components/HomePortal.tsx src/app/page.tsx
git commit -m "feat: new vision-led homepage with Display and Portal sections"
```

---

### Task 4: Create /display page

Move existing product components to /display with a new hero and CTA.

**Files:**
- Create: `src/components/DisplayHero.tsx`
- Create: `src/app/display/page.tsx`
- Modify: `src/components/BottomCTA.tsx` (optional — can be replaced inline)

- [ ] **Step 1: Create DisplayHero.tsx**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DisplayHero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        <div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
          >
            inklet Display D1
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              ...fadeUp,
              visible: {
                ...fadeUp.visible,
                transition: { duration: 0.6, delay: 0.15 },
              },
            }}
            className="text-lg text-[#666] leading-relaxed max-w-lg"
          >
            An ambient e-ink display that surfaces the right information in the
            right room — powered by AI, synced from the tools you already use.
          </motion.p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeUp,
            visible: {
              ...fadeUp.visible,
              transition: { duration: 0.6, delay: 0.3 },
            },
          }}
          className="flex justify-center lg:justify-end"
        >
          <Image
            src="/inklet-v1-black.png"
            alt="inklet Display D1"
            width={600}
            height={450}
            className="w-full max-w-lg"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create display/page.tsx**

```tsx
import DisplayHero from "@/components/DisplayHero";
import HowItWorks from "@/components/HowItWorks";
import Showcase3D from "@/components/Showcase3D";
import Privacy from "@/components/Privacy";
import FAQ from "@/components/FAQ";
import Link from "next/link";

export const metadata = {
  title: "Display D1 — inklet",
  description:
    "inklet Display D1 is an ambient e-ink display that surfaces the right information in the right room — powered by AI.",
};

export default function DisplayPage() {
  return (
    <>
      <DisplayHero />
      <HowItWorks />
      <Showcase3D />
      <Privacy />
      <FAQ />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Ready to bring calm to every room?
          </p>
          <Link
            href="/store"
            className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Get yours →
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/DisplayHero.tsx src/app/display/page.tsx
git commit -m "feat: add /display page with existing product content"
```

---

### Task 5: Build Store page — countdown + configurator

Create the countdown timer and D1 product configurator components, then wire them into the store page.

**Files:**
- Create: `src/components/StoreCountdown.tsx`
- Create: `src/components/StoreConfigurator.tsx`

- [ ] **Step 1: Create StoreCountdown.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";

const DEADLINE = new Date("2026-07-31T00:00:00-07:00").getTime();

function getTimeLeft() {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function StoreCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center py-8">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[2px] text-[#7a6a4f]">
          early bird has ended
        </span>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[2px] text-[#7a6a4f] mb-3">
        early bird ends in
      </div>
      <div className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#1a1a1a] tracking-wider">
        {timeLeft.days}d · {pad(timeLeft.hours)}h · {pad(timeLeft.minutes)}m ·{" "}
        {pad(timeLeft.seconds)}s
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create StoreConfigurator.tsx**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

const COLOR_IMAGES: Record<string, string> = {
  black: "/inklet-v1-black.png",
  white: "/inklet-v1-white.png",
};

const GALLERY_IMAGES = [
  "/inklet-v1-black.png",
  "/inklet-v1-white.png",
  "/inklet-v1-hallway.png",
  "/inklet-v1-kitchen.png",
  "/inklet-v1-kitchen2.png",
];

const STANDS = [
  { id: "regular", label: "Regular Stand", price: 0 },
  { id: "magnet", label: "Fridge Magnet", price: 0 },
  { id: "wood", label: "Solid Wood Stand", price: 10 },
];

const BASE_PRICE = 179;
const ORIGINAL_PRICE = 199;

export default function StoreConfigurator() {
  const [color, setColor] = useState<"black" | "white">("black");
  const [stand, setStand] = useState("regular");
  const [activeImage, setActiveImage] = useState(GALLERY_IMAGES[0]);

  const standAddon = STANDS.find((s) => s.id === stand)?.price ?? 0;
  const totalPrice = BASE_PRICE + standAddon;
  const totalOriginal = ORIGINAL_PRICE + standAddon;

  function handleColorChange(c: "black" | "white") {
    setColor(c);
    setActiveImage(COLOR_IMAGES[c]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Gallery */}
      <div>
        <div className="aspect-[4/3] relative bg-white/50 rounded-2xl overflow-hidden mb-4">
          <Image
            src={activeImage}
            alt="inklet Display D1"
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex gap-2">
          {GALLERY_IMAGES.map((src) => (
            <button
              key={src}
              onClick={() => setActiveImage(src)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                activeImage === src
                  ? "border-[#1a1a1a]"
                  : "border-[#e8e5db] hover:border-[#ccc]"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="flex flex-col justify-center">
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-light mb-6">
          inklet Display D1
        </h2>

        {/* Color */}
        <div className="mb-6">
          <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-wider uppercase mb-2 block">
            Color
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => handleColorChange("black")}
              className={`w-8 h-8 rounded-full bg-[#2a2a2a] ring-offset-2 ring-offset-[#f5f3ed] transition-shadow ${
                color === "black" ? "ring-2 ring-[#1a1a1a]" : ""
              }`}
              aria-label="Black"
            />
            <button
              onClick={() => handleColorChange("white")}
              className={`w-8 h-8 rounded-full bg-[#e8e5db] border border-[#ccc] ring-offset-2 ring-offset-[#f5f3ed] transition-shadow ${
                color === "white" ? "ring-2 ring-[#1a1a1a]" : ""
              }`}
              aria-label="White"
            />
          </div>
        </div>

        {/* Stand */}
        <div className="mb-6">
          <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-wider uppercase mb-2 block">
            Stand
          </span>
          <div className="flex flex-col gap-2">
            {STANDS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStand(s.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors ${
                  stand === s.id
                    ? "border-[#1a1a1a] bg-white/50"
                    : "border-[#e8e5db] hover:border-[#ccc]"
                }`}
              >
                <span>{s.label}</span>
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa]">
                  {s.price === 0 ? "Free" : `+$${s.price}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
              ${totalPrice}
            </span>
            <span className="text-[#aaa] line-through text-sm">
              ${totalOriginal}
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa]">
          <span>7.5" e-ink</span>
          <span>800×480</span>
          <span>2000mAh</span>
        </div>

        {/* CTA */}
        <a
          href={KICKSTARTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
        >
          Back on Kickstarter →
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/StoreCountdown.tsx src/components/StoreConfigurator.tsx
git commit -m "feat: add store countdown timer and D1 configurator"
```

---

### Task 6: Build Store page — bundles + Portal pricing + page assembly

Create bundle cards, Portal subscription pricing, and wire the full store page.

**Files:**
- Create: `src/components/StoreBundles.tsx`
- Create: `src/components/StorePortalPricing.tsx`
- Create: `src/app/store/page.tsx`

- [ ] **Step 1: Create StoreBundles.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const bundles = [
  {
    name: "Home Bundle",
    original: 749,
    sale: 649,
    features: [
      "4 × inklet e-ink displays",
      "6 months free cloud subscription ($60)",
      "Cover every room — kitchen, study, hallway, bedroom",
      "AI-powered content routing",
    ],
    savings: "$100 + $60 off",
    shipping: "Est. shipping by Q4 2026",
    highlight: true,
  },
  {
    name: "Pro Bundle",
    subtitle: "Self-Hosted Edition",
    original: 1499,
    sale: 1099,
    features: [
      "4 × inklet e-ink displays",
      "1 × inklet compute hub",
      "Fully local — no cloud required",
      "All AI processing on your network",
    ],
    savings: "$400 off",
    shipping: "Est. shipping by Q2 2027",
    highlight: false,
  },
];

export default function StoreBundles() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >
      {bundles.map((bundle) => (
        <div
          key={bundle.name}
          className={`relative rounded-2xl p-8 flex flex-col bg-white/50 ${
            bundle.highlight
              ? "ring-2 ring-[#1a1a1a]"
              : "ring-1 ring-[#e8e5db]"
          }`}
        >
          {bundle.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#f5f3ed] text-[10px] font-medium uppercase tracking-[2px] px-4 py-1 rounded-full">
              Most Popular
            </span>
          )}

          <div className="mb-6">
            <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-1">
              {bundle.name}
            </h3>
            {bundle.subtitle && (
              <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] tracking-wide text-[#aaa]">
                {bundle.subtitle}
              </span>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                ${bundle.sale}
              </span>
              <span className="text-[#bbb] text-xs">+ tax</span>
              <span className="text-[#aaa] line-through text-sm">
                ${bundle.original}
              </span>
            </div>
            <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] mt-1 block text-[#aaa]">
              {bundle.savings}
            </span>
          </div>

          <ul className="space-y-3 flex-1">
            {bundle.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <HiOutlineCheck
                  className="shrink-0 mt-0.5 text-[#aaa]"
                  size={14}
                />
                <span className="text-[#666]">{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-[10px] text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)] mt-6 pt-4 border-t border-[#e8e5db]">
            {bundle.shipping}
          </p>

          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full text-center px-6 py-3 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Back on Kickstarter →
          </a>
        </div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create StorePortalPricing.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const plans = [
  { name: "Monthly", price: "$10", period: "/mo", badge: null },
  { name: "Annual", price: "$100", period: "/yr", badge: "Save 17%" },
];

const features = [
  "Notion, Craft & Obsidian sync",
  "AI-powered content routing",
  "Cloud dashboard",
  "OTA firmware updates",
];

export default function StorePortalPricing() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
    >
      <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light text-center mb-12">
        inklet Portal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 flex flex-col bg-white/50 ${
              plan.badge
                ? "ring-2 ring-[#1a1a1a]"
                : "ring-1 ring-[#e8e5db]"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#f5f3ed] text-[10px] font-medium uppercase tracking-[2px] px-4 py-1 rounded-full">
                {plan.badge}
              </span>
            )}

            <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-4">
              {plan.name}
            </h3>

            <div className="mb-6">
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                {plan.price}
              </span>
              <span className="text-[#aaa] text-sm">{plan.period}</span>
            </div>

            <ul className="space-y-3 flex-1">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <HiOutlineCheck
                    className="shrink-0 mt-0.5 text-[#aaa]"
                    size={14}
                  />
                  <span className="text-[#666]">{feature}</span>
                </li>
              ))}
            </ul>

            <span className="mt-6 w-full text-center px-6 py-3 border border-[#e8e5db] text-[#bbb] rounded-full text-sm cursor-default select-none">
              Coming Soon
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create store/page.tsx**

```tsx
import StoreCountdown from "@/components/StoreCountdown";
import StoreConfigurator from "@/components/StoreConfigurator";
import StoreBundles from "@/components/StoreBundles";
import StorePortalPricing from "@/components/StorePortalPricing";

export const metadata = {
  title: "Store — inklet",
  description:
    "Get the inklet Display D1 at early bird pricing. Choose your color, stand, and bundle.",
};

export default function StorePage() {
  return (
    <div className="pt-24">
      {/* D1 Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <StoreCountdown />
        <StoreConfigurator />
      </section>

      {/* Bundles */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <StoreBundles />
      </section>

      {/* Portal Subscription */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <StorePortalPricing />
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/StoreBundles.tsx src/components/StorePortalPricing.tsx src/app/store/page.tsx
git commit -m "feat: add store page with bundles and Portal pricing"
```

---

### Task 7: Create /portal placeholder page

Minimal "Coming Soon" placeholder with dark aesthetic.

**Files:**
- Create: `src/app/portal/page.tsx`

- [ ] **Step 1: Create portal/page.tsx**

```tsx
export const metadata = {
  title: "Portal — inklet",
  description:
    "inklet Portal — your cloud dashboard for ambient life. Coming soon.",
};

export default function PortalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#f5f3ed] -mt-16 pt-16">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-4">
          inklet Portal
        </h1>
        <p className="text-[#555] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-wider">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
```

Note: the `-mt-16 pt-16` compensates for the nav height so the dark background extends behind the nav. The nav's transparent state will blend with the dark bg. If this doesn't work visually, an alternative is wrapping the page in a full-height dark container.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/portal/page.tsx
git commit -m "feat: add /portal placeholder page"
```

---

### Task 8: Update metadata and sitemap

Update root metadata to reflect company-level branding, and add new routes to sitemap.

**Files:**
- Modify: `src/app/layout.tsx` (metadata only)
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update root metadata in layout.tsx**

Change the metadata export (keep everything else unchanged):

```tsx
export const metadata: Metadata = {
  title: "inklet — Ambient Information, Everywhere",
  description:
    "inklet builds ambient technology that surfaces the right information in the right place. No glowing screens. No pings. Just clarity.",
  openGraph: {
    title: "inklet — Ambient Information, Everywhere",
    description:
      "Ambient technology that surfaces the right information in the right place.",
    type: "website",
    siteName: "inklet",
  },
  twitter: {
    card: "summary_large_image",
    title: "inklet — Ambient Information, Everywhere",
    description:
      "Ambient technology that surfaces the right information in the right place.",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Update sitemap.ts**

Read the current sitemap.ts and add the new routes. The sitemap should include:

```tsx
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.inklet.dev";
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/display`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/store`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/portal`, lastModified: new Date(), priority: 0.5 },
  ];
}
```

Note: Check the existing sitemap.ts for the actual base URL — use whatever is already there. The above uses `inklet.dev` as a placeholder.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/sitemap.ts
git commit -m "feat: update metadata and sitemap for multi-page site"
```

---

### Task 9: Clean up unused components

Remove components that are no longer imported anywhere after the restructure.

**Files:**
- Possibly delete: `src/components/Hero.tsx` (replaced by HomeHero + DisplayHero)
- Possibly delete: `src/components/BottomCTA.tsx` (replaced by StoreBundles + inline CTAs)
- Possibly delete: `src/components/UseCases.tsx` (if it exists and is unused)

- [ ] **Step 1: Check which components are still imported**

Run:
```bash
grep -r "from.*Hero\b" src/ --include="*.tsx" --include="*.ts"
grep -r "from.*BottomCTA" src/ --include="*.tsx" --include="*.ts"
grep -r "from.*UseCases" src/ --include="*.tsx" --include="*.ts"
```

Delete any file that has zero imports remaining. Keep files that are still used.

- [ ] **Step 2: Delete unused files**

```bash
# Only delete files confirmed unused in step 1
rm src/components/Hero.tsx        # replaced by HomeHero + DisplayHero
rm src/components/BottomCTA.tsx   # replaced by StoreBundles + inline CTAs
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors (confirms nothing still references deleted files)

- [ ] **Step 4: Commit**

```bash
git add -u
git commit -m "chore: remove unused Hero and BottomCTA components"
```

---

### Task 10: Visual verification

Start the dev server and check all pages in the browser.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Check each route**

Open each URL and verify:

1. **http://localhost:3000** — Homepage: Hero with vision statement → Display D1 section with product image → Portal dark section → Footer CTA
2. **http://localhost:3000/display** — DisplayHero → How It Works → 3D Showcase (scroll) → Privacy → FAQ → "Get yours" CTA
3. **http://localhost:3000/store** — Countdown timer → D1 configurator (switch colors, stands, check price) → Bundle cards → Portal pricing
4. **http://localhost:3000/portal** — Dark page with "Coming Soon"

Check on each page:
- Nav shows on all pages with correct links
- Footer shows on all pages
- Portal nav link is grayed out with "soon" label
- Active page is highlighted in nav
- Mobile hamburger menu works
- Responsive layout works (resize browser)

- [ ] **Step 3: Fix any visual issues found**

Address any layout, spacing, or styling problems discovered during visual review.
