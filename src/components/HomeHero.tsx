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
    <section className="h-screen flex flex-col overflow-hidden pt-16">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
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
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex justify-center px-6 pb-0"
      >
        <div className="w-full max-w-[520px]">
          <EInkDisplay screens={screens} showLabel={false} />
        </div>
      </motion.div>
    </section>
  );
}
