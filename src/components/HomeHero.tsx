"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

const SCREEN_BOTTOM_INSET = 0.186;

export default function HomeHero() {
  const deviceRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const calcOffset = useCallback(() => {
    const desktop = window.innerWidth >= 768;
    setIsDesktop(desktop);
    if (!desktop) {
      setOffset(0);
      return;
    }
    const el = deviceRef.current;
    if (!el) return;
    const frameEl = el.querySelector(
      "[style*='aspect-ratio']"
    ) as HTMLElement | null;
    if (!frameEl) return;
    const frameH = frameEl.offsetHeight;
    const labelH = el.offsetHeight - frameH;
    setOffset(frameH * SCREEN_BOTTOM_INSET + labelH);
  }, []);

  useEffect(() => {
    calcOffset();
    window.addEventListener("resize", calcOffset);
    return () => window.removeEventListener("resize", calcOffset);
  }, [calcOffset]);

  return (
    <section className="pt-16 mb-32">
      <div
        className={`relative overflow-visible ${
          isDesktop ? "h-[calc(100dvh-4rem)]" : ""
        }`}
      >
        {/* Text */}
        <div
          className="relative z-10 flex flex-col items-center px-6 pt-8 md:pt-16 pb-16"
          style={
            isDesktop
              ? {
                  background:
                    "linear-gradient(to bottom, #f5f3ed 60%, rgba(245,243,237,0) 100%)",
                }
              : undefined
          }
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-6 text-center"
          >
            Your second brain,
            <br />
            on e-ink display.
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

        {/* Device */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`flex justify-center px-6 ${
            isDesktop ? "absolute left-0 right-0" : "mt-8"
          }`}
          style={isDesktop ? { bottom: `-${offset}px` } : undefined}
        >
          <div
            ref={deviceRef}
            className="w-full max-w-[624px] [&>div]:max-w-none"
          >
            <EInkDisplay screens={screens} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
