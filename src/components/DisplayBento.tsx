"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DisplayBento() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-8 pb-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[230px] gap-4"
      >
        {/* Battery life */}
        <div className="bg-[#EFEDE7] rounded-[20px] p-8 flex flex-col justify-end min-h-[180px]">
          <div className="font-[family-name:var(--font-newsreader)] font-light text-[44px] leading-none">
            Months
          </div>
          <div className="text-sm text-[#666] mt-2">
            2000 mAh — charge it, then forget it.
          </div>
        </div>

        {/* E-ink — dark card */}
        <div className="bg-[#1a1a1a] text-[#f5f3ed] rounded-[20px] p-8 flex flex-col justify-end min-h-[180px]">
          <div className="font-[family-name:var(--font-newsreader)] font-light text-[30px] leading-tight">
            Reads like paper.
          </div>
          <div className="text-sm text-[#a8a39a] mt-2">
            E-ink — no glow, no eye strain.
          </div>
        </div>

        {/* Device photo */}
        <div className="bg-[#EFEDE7] rounded-[20px] overflow-hidden flex items-center justify-center min-h-[220px]">
          <div
            className="w-[82%]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
              WebkitMaskComposite: "destination-in",
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
              maskComposite: "intersect",
            }}
          >
            <Image
              src="/inklet-v1-white.png"
              alt="inklet D1 in matte white"
              width={600}
              height={450}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mounting — spans 2 columns */}
        <div className="md:col-span-2 bg-[#EFEDE7] rounded-[20px] p-8 md:px-10 flex flex-col justify-end min-h-[180px]">
          <div className="font-[family-name:var(--font-newsreader)] font-light text-[34px] leading-tight">
            Stand. Magnet. Wood.
          </div>
          <div className="text-sm text-[#666] mt-2.5 max-w-md">
            Desk, fridge, or shelf — it mounts where the moment happens.
          </div>
        </div>

        {/* Sync */}
        <div className="bg-[#EFEDE7] rounded-[20px] p-8 flex flex-col justify-end min-h-[180px]">
          <div className="font-[family-name:var(--font-newsreader)] font-light text-[30px] leading-tight">
            Push from anywhere.
          </div>
          <div className="text-sm text-[#666] mt-2">
            Send anything to the right screen, straight from your phone or laptop.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
