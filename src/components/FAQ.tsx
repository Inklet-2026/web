"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { faqItems } from "@/data/faq";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function FAQAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e8e5db]">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 rounded-lg px-3 -mx-3 transition-colors hover:bg-[#eae7df]/50"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h3 className="font-[family-name:var(--font-newsreader)] text-lg text-[#1a1a1a]">
          {question}
        </h3>
        {open ? (
          <HiOutlineMinus className="shrink-0 text-[#aaa]" size={18} />
        ) : (
          <HiOutlinePlus className="shrink-0 text-[#aaa]" size={18} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[#666] text-[15px] leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-16"
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          {faqItems.map((item) => (
            <FAQAccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
