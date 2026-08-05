
const features = [
  {
    number: "01",
    title: "One dashboard, every display",
    description:
      "Control what appears on every inklet display from a single place. Update content, check status, and manage rooms — all from your browser or phone.",
  },
  {
    number: "02",
    title: "Sync the tools you use",
    description:
      "Connect Google Calendar, Notion, Obsidian, Todoist, and more. Your data flows in automatically — no copy-paste, no manual updates.",
  },
  {
    number: "03",
    title: "AI-powered routing",
    description:
      "Portal's AI decides what goes where. Recipes to the kitchen, meeting agendas to the study, weather to the hallway — context-aware, hands-free.",
  },
];

export default function PortalFeatures() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20">
          Your displays, orchestrated.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature) => (
            <div
              key={feature.number}
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#555] tracking-wider">
                {feature.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {feature.title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
