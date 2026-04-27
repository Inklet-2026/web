"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DisplayHero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase mb-3"
          >
            Display
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
          >
            inklet D1
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
          className="lg:justify-end"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
            WebkitMaskComposite: "destination-in",
            maskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
            maskComposite: "intersect",
          }}
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
