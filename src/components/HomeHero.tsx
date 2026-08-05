"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { rise, riseIn } from "@/lib/motion";
import {
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import EInkDisplay from "@/components/EInkDisplay";
import { screens } from "@/data/screens";

const pillars = [
  { Icon: HiOutlineLightBulb, text: "Contextual, not chaotic" },
  { Icon: HiOutlineEye, text: "Easy on the eyes" },
  { Icon: HiOutlineShieldCheck, text: "Private by design" },
];

const highlights = [
  "E-ink — no backlight, no eye strain",
  "AI-powered content routing",
  "Notion, Craft & Obsidian sync",
];

export default function HomeHero() {
  return (
    <section className="pt-16 mb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Headline row — title on the left, award + tagline on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end pt-16 md:pt-28 pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={rise}>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15]">
              Your second brain,
              <br />
              on e-ink displays.
            </h1>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {pillars.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-sm text-[#888]"
                >
                  <Icon size={18} className="shrink-0 text-[#aaa]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseIn(0.2)}
            className="flex flex-col items-start lg:items-end gap-4 shrink-0"
          >
            <a
              href="https://www.uneed.best/tool/inklet"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.uneed.best/POTD1A.png"
                alt="inklet — Daily winner on Uneed"
                width={250}
                height={67}
                className="w-[160px] sm:w-[175px] h-auto"
              />
            </a>
            <p className="text-sm text-[#aaa] leading-relaxed lg:text-right">
              Information should find you,
              <br className="hidden sm:block" /> not the other way around.
            </p>
          </motion.div>
        </div>
      </div>

      {/*
       * Product panel — the D1 story next to the live screen.
       * The panel is wider than the 6xl content column by exactly its own
       * lg padding (7rem total), so the copy inside lands on the same
       * gridline as every section below it.
       */}
      <div className="max-w-6xl lg:max-w-[calc(72rem+7rem)] mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={riseIn(0.35)}
          className="rounded-[28px] border border-[#e5e1d5] bg-[#efece4]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 lg:gap-14 items-center p-8 md:p-12 lg:p-14">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase mb-3">
                Display
              </p>
              <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5">
                inklet D1
              </h2>
              <p className="text-[#666] leading-relaxed mb-6 max-w-md">
                An e-ink ambient display that blends into your space. No glowing
                screens, no notifications — just the right information, quietly
                appearing where you need it.
              </p>
              <ul className="space-y-2 mb-8">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-[#888]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#aaa] shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href="/display"
                className="inline-flex items-center text-sm text-[#1a1a1a] border border-[#1a1a1a] px-6 py-3 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
              >
                Discover more →
              </Link>
            </div>

            <div
              className="order-1 lg:order-2 flex justify-center [&>div]:max-w-none"
              style={{ filter: "drop-shadow(0 20px 45px rgba(26,26,26,0.09))" }}
            >
              <EInkDisplay screens={screens} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
