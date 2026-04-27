"use client";

import { motion } from "framer-motion";
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlinePencilAlt,
  HiOutlineRefresh,
} from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    Icon: HiOutlineCalendar,
    title: "Schedule",
    desc: "Calendar synced to your walls",
  },
  {
    Icon: HiOutlineChartBar,
    title: "Dashboard",
    desc: "Manage all displays from one place",
  },
  {
    Icon: HiOutlinePencilAlt,
    title: "Notes",
    desc: "Notion, Craft & Obsidian sync",
  },
  {
    Icon: HiOutlineRefresh,
    title: "AI Routing",
    desc: "Right info to the right room",
  },
];

export default function HomePortal() {
  return (
    <section className="py-32 bg-[#1a1a1a] text-[#f5f3ed]">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-16 max-w-md ml-auto text-right"
        >
          <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3">
            Software
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5">
            inklet Portal
          </h2>
          <p className="text-[#888] leading-relaxed">
            Your cloud dashboard for ambient life. Manage what appears on your
            displays, sync with the tools you already use, and let AI handle the
            rest.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center"
        >
          {features.map(({ Icon, title, desc }) => (
            <div key={title}>
              <Icon size={24} className="text-[#555] mb-3 mx-auto" />
              <h3 className="text-sm font-medium mb-1">{title}</h3>
              <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex justify-end"
        >
          <span className="inline-flex items-center text-sm text-[#555] border border-[#333] px-6 py-3 rounded-full cursor-default select-none">
            Coming Soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
