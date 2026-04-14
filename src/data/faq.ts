export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is inklet?",
    answer:
      "inklet is a distributed e-ink display system for your home. It surfaces information from your notes, tasks, and apps on dedicated screens around your house — organized automatically by AI.",
  },
  {
    question: "How does the AI know where to put my content?",
    answer:
      "inklet's on-device AI analyzes what you save and categorizes it by context — work, cooking, schedule, wellness. Each display is assigned to a room, and content routes there automatically.",
  },
  {
    question: "What apps does inklet sync with?",
    answer:
      "inklet syncs with Notion, Craft, and Obsidian out of the box. You can also send content directly from your phone or computer. More integrations are on the roadmap.",
  },
  {
    question: "Does inklet require an internet connection?",
    answer:
      "Not with the self-hosted hub. The Gemma 4-powered compute unit processes everything locally on your home network. The cloud version is available for those who prefer it.",
  },
  {
    question: "What size are the displays?",
    answer:
      "The launch model features a 7.5-inch e-paper display — the same technology used in e-readers. Crisp, paper-like, and easy on the eyes.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Months on a single charge. E-ink only draws power when the screen refreshes, so inklet sips energy instead of draining it.",
  },
  {
    question: "Is my data sent to the cloud?",
    answer:
      "Only if you choose the cloud option. With the self-hosted hub, all data stays on your local network. Nothing leaves your home.",
  },
  {
    question: "When will inklet be available?",
    answer:
      "We're launching on Kickstarter soon. Back us on our pre-launch page to get notified the moment we go live.",
  },
  {
    question: "Can I build custom screens or plugins?",
    answer:
      "Yes. A developer SDK is on our roadmap, so you can create custom layouts and data sources for your displays.",
  },
  {
    question: "How is inklet different from other e-ink displays?",
    answer:
      "inklet is multi-display and AI-routed. Instead of one screen showing one dashboard, inklet distributes the right content to the right room — automatically. Plus, it's the only system offering fully local, private AI processing.",
  },
];
