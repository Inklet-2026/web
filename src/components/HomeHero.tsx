"use client";

import { motion } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const pillars = [
  { Icon: HiOutlineLightBulb, text: "Contextual, not chaotic" },
  { Icon: HiOutlineEye, text: "Ambient, not intrusive" },
  { Icon: HiOutlineShieldCheck, text: "Private by design" },
];

export default function HomeHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-8"
        >
          Information should find you,
          <br />
          not the other way around.
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeUp,
            visible: {
              ...fadeUp.visible,
              transition: { duration: 0.8, delay: 0.2 },
            },
          }}
          className="text-[#666] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
        >
          Modern technology competes for your attention. We believe the answer to
          information fragmentation isn&apos;t to reject everything or accept it
          all uncritically — it&apos;s to organize and surface what matters,
          right where you need it.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeUp,
            visible: {
              ...fadeUp.visible,
              transition: { duration: 0.8, delay: 0.4 },
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
    </section>
  );
}
