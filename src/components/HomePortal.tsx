"use client";

import { motion } from "framer-motion";
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlinePencilAlt,
} from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const icons = [
  { Icon: HiOutlineCalendar, label: "Schedule" },
  { Icon: HiOutlineChartBar, label: "Dashboard" },
  { Icon: HiOutlinePencilAlt, label: "Notes" },
];

export default function HomePortal() {
  return (
    <section className="min-h-screen flex items-center bg-[#1a1a1a] text-[#f5f3ed]">
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-16"
        >
          inklet Portal
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex justify-center gap-20 mb-20"
        >
          {icons.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <Icon size={32} className="text-[#666]" />
              <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-md"
        >
          <p className="text-[#888] leading-relaxed mb-6">
            Your cloud dashboard for ambient life. Manage what appears on your
            displays, sync with the tools you already use, and let AI handle the
            rest.
          </p>
          <span className="inline-flex items-center text-sm text-[#555] border border-[#333] px-6 py-3 rounded-full cursor-default select-none">
            Coming Soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
