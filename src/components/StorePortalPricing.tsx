"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const pricing = {
  yearly: { price: "$100", period: "/yr", note: "$8.33/mo" },
  monthly: { price: "$10", period: "/mo", note: null },
};

const features = [
  "Notion, Craft & Obsidian sync",
  "AI-powered content routing",
  "Cloud dashboard",
  "OTA firmware updates",
];

export default function StorePortalPricing() {
  const [tab, setTab] = useState<"yearly" | "monthly">("yearly");
  const current = pricing[tab];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="bg-[#1a1a1a] text-[#f5f3ed] rounded-3xl overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 md:p-16">
        {/* Left — pricing */}
        <div>
          <div className="inline-flex rounded-full border border-[#333] p-1 mb-8">
            <button
              onClick={() => setTab("yearly")}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-colors ${
                tab === "yearly"
                  ? "bg-[#f5f3ed] text-[#1a1a1a]"
                  : "text-[#888] hover:text-[#ccc]"
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setTab("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-colors ${
                tab === "monthly"
                  ? "bg-[#f5f3ed] text-[#1a1a1a]"
                  : "text-[#888] hover:text-[#ccc]"
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-5xl font-light">
                {current.price}
              </span>
              <span className="text-[#666] text-sm">{current.period}</span>
            </div>
            {current.note && (
              <span className="text-xs text-[#555] font-[family-name:var(--font-ibm-plex-mono)] mt-1 block">
                {current.note}
              </span>
            )}
            {tab === "yearly" && (
              <span className="inline-block mt-2 text-[10px] font-medium uppercase tracking-[2px] text-[#7a6a4f]">
                Save 17%
              </span>
            )}
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <HiOutlineCheck
                  className="shrink-0 mt-0.5 text-[#555]"
                  size={14}
                />
                <span className="text-[#999]">{feature}</span>
              </li>
            ))}
          </ul>

          <span className="inline-flex items-center text-sm text-[#555] border border-[#333] px-6 py-3 rounded-full cursor-default select-none">
            Coming Soon
          </span>
        </div>

        {/* Right — title + description */}
        <div className="flex flex-col justify-center lg:pl-8">
          <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3">
            Software
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5">
            inklet Portal
          </h2>
          <p className="text-[#888] leading-relaxed">
            Your cloud dashboard for ambient life. Manage what appears on your
            displays, sync with the tools you already use, and let AI route the
            right content to the right room.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
