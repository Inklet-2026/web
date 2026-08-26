import CodeBlock from "@/components/CodeBlock";

const POLLING = `const result = await inklet.push.auto({ assets });

// A successful push commonly returns a \`processing\` Content
// with no Presentation IDs yet. Poll until it settles.
let content = await inklet.contents.retrieve(result.contentId);

while (content.state === "processing") {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  content = await inklet.contents.retrieve(content.id);
}

if (content.state === "failed") {
  console.error(content.processing.error);
}`;

/** The stages the backend reports while a Content is processing. */
const stages = [
  "awaiting_upload",
  "fetching_links",
  "summarizing",
  "routing",
  "creating_presentations",
];

const states = [
  {
    label: "Content",
    values: ["pending", "processing", "ready"],
    note: "What you handed in.",
  },
  {
    label: "Presentation",
    values: ["preparing", "queued", "published", "confirmed"],
    note: "What a specific panel will show.",
  },
];

export default function SdkLifecycle() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#777] mb-3">
              Lifecycle
            </p>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5 leading-snug">
              A push is a request, not a render.
            </h2>
            <p className="text-[#888] leading-relaxed max-w-md mb-10">
              The call returns as soon as Inklet has your assets. Summarising,
              routing, and rendering happen after — and a display only shows the
              result once it wakes and confirms it. Poll the Content if you need
              to know it landed.
            </p>

            <div className="space-y-8">
              {states.map((row) => (
                <div key={row.label}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase">
                      {row.label}
                    </span>
                    <span className="text-[13px] text-[#555]">{row.note}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {row.values.map((value, index) => (
                      <span key={value} className="flex items-center gap-2">
                        {index > 0 && (
                          <span className="text-[#3a3a3a] text-xs">→</span>
                        )}
                        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11.5px] text-[#c9c6be] border border-[#2a2a2a] rounded px-2.5 py-1">
                          {value}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <p className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase mb-3">
                  Processing stages
                </p>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11.5px] text-[#555] leading-relaxed">
                  {stages.join("  ·  ")}
                </p>
              </div>
            </div>
          </div>

          <CodeBlock code={POLLING} filename="wait.ts" />
        </div>
      </div>
    </section>
  );
}
