import type { FAQItem } from "@/data/faq";

// Name-disambiguation Q&A — clarifies inklet LLC vs. other products that have
// shared the "inklet" name. Rendered on /about and emitted as FAQPage JSON-LD.
export const disambiguationFaq: FAQItem[] = [
  {
    question: "What does inklet LLC make?",
    answer:
      "Three things: the inklet D1 ambient e-ink display, the inklet H1 local AI compute hub, and inklet Portal — the software that connects your notes, PDFs, and calendars to your displays.",
  },
  {
    question: "Is inklet the Mac trackpad drawing app?",
    answer:
      "No. inklet by inklet LLC is an ambient e-ink display system for notes, PDFs, tasks, and room-based information. It has nothing to do with the older Inklet app that turned Mac trackpads into pen tablets.",
  },
  {
    question: "Where is the official inklet site?",
    answer:
      "iminklet.com is the official home of inklet by inklet LLC. You'll also find us on Kickstarter and Product Hunt, or reach us any time at core@iminklet.com.",
  },
];
