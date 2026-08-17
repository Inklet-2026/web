const resources = [
  {
    name: "displays",
    summary: "The panels bound to your account, and what each can render.",
    methods: [
      ["list()", "Paginated, newest first"],
      ["retrieve(id)", "Battery, firmware, tags, capabilities"],
      ["listQueue(id)", "What is waiting, over a time range"],
      ["current(id)", "The confirmed Presentation, or null"],
    ],
  },
  {
    name: "contents",
    summary: "The lower-level lifecycle, when push.* hides too much.",
    methods: [
      ["create(input, key)", "Returns upload tickets"],
      ["retrieve(id)", "State, stage, warnings, errors"],
      ["list()", "Filter by mode and state"],
      ["confirm(id)", "Close uploads and start processing"],
    ],
  },
  {
    name: "presentations",
    summary: "A rendered frame for one display, in one format.",
    methods: [
      ["retrieve(id)", "png · raw2 · raw4"],
    ],
  },
  {
    name: "assets",
    summary: "Validated locally, before anything leaves the process.",
    methods: [
      ["text(string)", "Plain prose"],
      ["link(url)", "Fetched and summarised by Inklet"],
      ["image({ data })", "png · jpeg · gif · webp · svg"],
      ["file({ data })", "pdf · txt · md · json"],
    ],
  },
];

export default function SdkResources() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3">
          Reference
        </p>
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-16 max-w-2xl leading-snug">
          Four resources, fully typed.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
          {resources.map((resource) => (
            <div key={resource.name}>
              <h3 className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#f5f3ed] mb-2">
                inklet.{resource.name}
              </h3>
              <p className="text-[14px] text-[#888] leading-relaxed mb-5 max-w-sm">
                {resource.summary}
              </p>
              <ul className="border-t border-[#2a2a2a]">
                {resource.methods.map(([method, note]) => (
                  <li
                    key={method}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2.5 border-b border-[#2a2a2a]"
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px] text-[#c9c6be]">
                      {method}
                    </span>
                    <span className="text-[12.5px] text-[#666]">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
