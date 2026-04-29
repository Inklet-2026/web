"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const highlights = [
  "Push API — send content to any display",
  "TypeScript & Python SDKs",
  "Works with Portal cloud and local compute hub",
];

function CodePreview() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
      {/* Terminal dots */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#2a2a2a]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      {/* Code */}
      <pre className="p-5 text-[13px] leading-relaxed font-[family-name:var(--font-ibm-plex-mono)] overflow-x-auto">
        <code>
          <span className="text-[#7aa2f7]">import</span>
          <span className="text-[#888]">{" { "}</span>
          <span className="text-[#f5f3ed]">Inklet</span>
          <span className="text-[#888]">{" } "}</span>
          <span className="text-[#7aa2f7]">from</span>
          <span className="text-[#9ece6a]"> &apos;@inklet/sdk&apos;</span>
          {"\n\n"}
          <span className="text-[#7aa2f7]">const</span>
          <span className="text-[#f5f3ed]"> inklet </span>
          <span className="text-[#888]">= </span>
          <span className="text-[#7aa2f7]">new</span>
          <span className="text-[#f5f3ed]"> Inklet</span>
          <span className="text-[#888]">{"({ "}</span>
          <span className="text-[#bb9af7]">apiKey</span>
          <span className="text-[#888]">: </span>
          <span className="text-[#9ece6a]">&apos;il_...&apos;</span>
          <span className="text-[#888]">{" })"}</span>
          {"\n\n"}
          <span className="text-[#7aa2f7]">await</span>
          <span className="text-[#f5f3ed]"> inklet.content.</span>
          <span className="text-[#7aa2f7]">push</span>
          <span className="text-[#888]">{"({"}</span>
          {"\n"}
          <span className="text-[#bb9af7]">  type</span>
          <span className="text-[#888]">: </span>
          <span className="text-[#9ece6a]">&apos;markdown&apos;</span>
          <span className="text-[#888]">,</span>
          {"\n"}
          <span className="text-[#bb9af7]">  body</span>
          <span className="text-[#888]">: </span>
          <span className="text-[#9ece6a]">&apos;# Grocery List\n- Milk\n- Eggs&apos;</span>
          <span className="text-[#888]">,</span>
          {"\n"}
          <span className="text-[#bb9af7]">  metadata</span>
          <span className="text-[#888]">{": { "}</span>
          <span className="text-[#bb9af7]">tags</span>
          <span className="text-[#888]">: [</span>
          <span className="text-[#9ece6a]">&apos;kitchen&apos;</span>
          <span className="text-[#888]">{"] },"}</span>
          {"\n"}
          <span className="text-[#bb9af7]">  ttl</span>
          <span className="text-[#888]">: </span>
          <span className="text-[#9ece6a]">&apos;24h&apos;</span>
          {"\n"}
          <span className="text-[#888]">{"})"}</span>
        </code>
      </pre>
    </div>
  );
}

export default function HomeSDK() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase mb-3">
            SDK
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5">
            inklet Portal SDK
          </h2>
          <p className="text-[#666] leading-relaxed mb-6 max-w-md">
            Build custom integrations for your inklet displays. Push content from
            any source through a simple API — your data, your workflow, your
            displays.
          </p>
          <ul className="space-y-2 mb-8">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm text-[#888]"
              >
                <span className="w-1 h-1 rounded-full bg-[#aaa] shrink-0" />
                {h}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center text-sm text-[#aaa] border border-[#e8e5db] px-6 py-3 rounded-full cursor-default select-none">
            Coming Soon
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <CodePreview />
        </motion.div>
      </div>
    </section>
  );
}
