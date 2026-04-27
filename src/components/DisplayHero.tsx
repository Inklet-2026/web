"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DisplayHero() {
  return (
    <section className="pt-32 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase mb-4"
        >
          inklet Display
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeUp,
            visible: {
              ...fadeUp.visible,
              transition: { duration: 0.6, delay: 0.1 },
            },
          }}
          className="font-[family-name:var(--font-newsreader)] text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] mb-6"
        >
          D1
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeUp,
            visible: {
              ...fadeUp.visible,
              transition: { duration: 0.6, delay: 0.2 },
            },
          }}
          className="text-[#666] text-base md:text-lg max-w-md mx-auto mb-4"
        >
          Ambient e-ink that surfaces the right information in the right room —
          powered by AI, synced from the tools you already use.
        </motion.p>
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
          className="flex justify-center gap-4 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa]"
        >
          <span>7.5" e-ink</span>
          <span className="text-[#ddd]">/</span>
          <span>800×480</span>
          <span className="text-[#ddd]">/</span>
          <span>2000mAh</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="max-w-4xl mx-auto px-6"
      >
        <Image
          src="/inklet-v1-black.png"
          alt="inklet Display D1"
          width={1200}
          height={900}
          className="w-full"
          priority
        />
      </motion.div>
    </section>
  );
}
