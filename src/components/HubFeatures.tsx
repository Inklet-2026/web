
const features = [
  {
    number: "01",
    title: "Fully local AI",
    description:
      "All inference runs on the H1 itself — your notes, schedules, and queries never leave your network. Powered by Gemma 4, optimized for on-device performance.",
  },
  {
    number: "02",
    title: "Manages every display",
    description:
      "One hub controls all inklet displays in your home. It decides what goes where — work tasks to the study, recipes to the kitchen, reminders to the hallway.",
  },
  {
    number: "03",
    title: "No subscription required",
    description:
      "No monthly cloud fee. The H1 replaces the inklet Portal subscription entirely. Buy once, run forever on your own hardware.",
  },
];

export default function HubFeatures() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20">
          Your own AI, on your own network.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature) => (
            <div
              key={feature.number}
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#aaa] tracking-wider">
                {feature.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {feature.title}
              </h3>
              <p className="text-[#666] leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
