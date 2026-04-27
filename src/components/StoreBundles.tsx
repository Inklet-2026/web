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
