"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function DashboardMockup() {
  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden border border-[#2a2a2a]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555]">
          portal.iminklet.com
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <span className="font-[family-name:var(--font-newsreader)] text-sm text-[#f5f3ed]">
            My Displays
          </span>
          <span className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[#555]">
            3 online
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#f5f3ed]">Kitchen</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-[#2a2a2a] rounded w-full" />
              <div className="h-1.5 bg-[#2a2a2a] rounded w-3/4" />
              <div className="h-1.5 bg-[#2a2a2a] rounded w-1/2" />
            </div>
            <span className="text-[9px] text-[#555] mt-2 block font-[family-name:var(--font-ibm-plex-mono)]">
              Grocery list
            </span>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#f5f3ed]">Study</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-[#2a2a2a] rounded w-full" />
              <div className="h-1.5 bg-[#2a2a2a] rounded w-5/6" />
              <div className="h-1.5 bg-[#2a2a2a] rounded w-2/3" />
            </div>
            <span className="text-[9px] text-[#555] mt-2 block font-[family-name:var(--font-ibm-plex-mono)]">
              Calendar
            </span>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#f5f3ed]">Hallway</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-[#2a2a2a] rounded w-full" />
              <div className="h-1.5 bg-[#2a2a2a] rounded w-4/5" />
            </div>
            <span className="text-[9px] text-[#555] mt-2 block font-[family-name:var(--font-ibm-plex-mono)]">
              Weather
            </span>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-3 border border-dashed border-[#333] flex items-center justify-center min-h-[88px]">
            <span className="text-[#333] text-lg">+</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
          <span className="text-[10px] text-[#555] font-[family-name:var(--font-ibm-plex-mono)]">
            Last sync: just now
          </span>
          <span className="text-[10px] text-[#555] font-[family-name:var(--font-ibm-plex-mono)]">
            ↻
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PortalHero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3"
          >
            Software
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
          >
            inklet Portal
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
            className="text-lg text-[#888] leading-relaxed max-w-lg"
          >
            Your cloud dashboard for ambient life. Manage what appears on every
            display, sync with the tools you already use, and let AI handle the
            rest.
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
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
