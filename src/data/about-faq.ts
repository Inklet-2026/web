import type { FAQItem } from "@/data/faq";

// About-page Q&A — company, story, and name disambiguation (inklet LLC vs. other
// products that have shared the name). Rendered on /about and emitted as
// FAQPage JSON-LD.
export const disambiguationFaq: FAQItem[] = [
  {
    question: "What does inklet LLC make?",
    answer:
      "Three things: the inklet D1 ambient e-ink display, the inklet H1 local AI compute hub, and inklet Portal — the software that connects your notes, PDFs, and calendars to your displays.",
  },
  {
    question: "Who's behind inklet?",
    answer:
      "inklet is built by inklet LLC — a small, independent team led by founder Kevin Zhong, with engineers across software, embedded, and backend. We stay deliberately small so we can obsess over the details that make an ambient product feel calm.",
  },
  {
    question: "What does inklet believe in?",
    answer:
      "That information should find you, not the other way around, and that technology should behave like furniture — useful, quiet, and there when you need it. Privacy is part of that: pair the D1 with the local Compute Hub and nothing has to leave your home.",
  },
  {
    question: "Is inklet the Mac trackpad drawing app?",
    answer:
      "No. inklet by inklet LLC is an ambient e-ink display system for notes, PDFs, tasks, and room-based information. It has nothing to do with the older Inklet app that turned Mac trackpads into pen tablets.",
  },
  {
    question: "When can I get an inklet?",
    answer:
      "We're launching on Kickstarter soon. Back our pre-launch page to be notified the moment we go live — early backers lock in founder pricing, with units estimated to ship in Q4 2026.",
  },
  {
    question: "How can I reach you?",
    answer:
      "Email us any time at core@iminklet.com. You can also follow along on Kickstarter and Product Hunt for the latest updates.",
  },
  {
    question: "Where is the official inklet site?",
    answer:
      "iminklet.com is the official home of inklet by inklet LLC. You'll also find us on Kickstarter and Product Hunt, or reach us any time at core@iminklet.com.",
  },
];
