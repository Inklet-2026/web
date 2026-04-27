"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const highlights = [
  "E-ink — no backlight, no eye strain",
  "AI-powered content routing",
  "Notion, Craft & Obsidian sync",
];

export default function HomeDisplay() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="order-2 lg:order-1"
        >
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
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="order-1 lg:order-2"
        >
          <Image
            src="/inklet-v1-black.png"
            alt="inklet Display D1"
            width={900}
            height={675}
            className="w-[115%] max-w-none"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
