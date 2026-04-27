"use client";

import { motion } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import EInkDisplay from "@/components/EInkDisplay";
import { screens } from "@/data/screens";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const pillars = [
  { Icon: HiOutlineLightBulb, text: "Contextual, not chaotic" },
  { Icon: HiOutlineEye, text: "Easy on the eyes" },
  { Icon: HiOutlineShieldCheck, text: "Private by design" },
];

export default function HomeHero() {
  return (
    <section className="pt-16 mb-32">
      {/* Text area fills viewport */}
      <div className="min-h-[calc(100dvh-4rem)] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 md:pt-16">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-10 text-center"
          >
            Information should find you,
            <br />
            not the other way around.
          </motion.h1>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              ...fadeUp,
              visible: {
                ...fadeUp.visible,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10"
          >
            {pillars.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-sm text-[#888]"
              >
                <Icon size={18} className="shrink-0 text-[#aaa]" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Device — screen bottom aligns with viewport bottom, bezel + label below fold */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center px-6"
        >
          <div
            className="w-full max-w-[780px] [&>div]:max-w-none"
            style={{ transform: "translateY(32%)" }}
          >
            <EInkDisplay screens={screens} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
