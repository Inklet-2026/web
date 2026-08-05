import StaticPanel from "@/components/StaticPanel";

/* The things a person actually saves — and then never sees again. */
const SAVED = [
  { name: "Screenshot 2,481", meta: "3w ago" },
  { name: "Braised short ribs.pdf", meta: "saved" },
  { name: "Notion — Q3 planning", meta: "12 tabs" },
  { name: "Link: standing desk", meta: "read later" },
  { name: "IMG_4417.HEIC", meta: "2m ago" },
  { name: "Obsidian — daily note", meta: "unopened" },
  { name: "Boarding pass.pdf", meta: "yesterday" },
  { name: "Screenshot 2,482", meta: "just now" },
];

const FADE =
  "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)";

export default function DisplayProblem() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase mb-4">
            The problem
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light">
            You saved it. Then it disappeared.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Everything scrolling away inside the apps */}
          <div
            aria-hidden="true"
            className="relative h-[300px] sm:h-[380px] overflow-hidden border border-[#e8e5db] bg-[#efece4]"
            style={{ maskImage: FADE, WebkitMaskImage: FADE }}
          >
            <div className="drift-track flex flex-col gap-2.5 p-4">
              {[...SAVED, ...SAVED].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 border border-[#e8e5db] bg-[#f5f3ed] px-3 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px]"
                >
                  <span className="text-[#888] truncate">{item.name}</span>
                  <span className="text-[#bbb] shrink-0">{item.meta}</span>
                </div>
              ))}
            </div>
          </div>

          {/* One thing, standing still */}
          <div className="flex flex-col gap-4">
            <StaticPanel
              size="large"
              screen={{
                subtitle: "Tonight",
                title: "Braised short ribs",
                detail: "sear 8 min · braise 3 h · serves 4",
                stamp: "Apr 14  19:12",
                alt: "inklet D1 holding a recipe in the kitchen",
              }}
            />
            <p className="text-center text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[1.5px]">
              Kitchen · unchanged since 17:40
            </p>
          </div>
        </div>

        {/* Premise, problem, answer — one statement in three beats. Each line
            gains weight and size on the way down, so the last one lands. */}
        <div className="font-[family-name:var(--font-newsreader)] font-light text-center mt-20 max-w-3xl mx-auto flex flex-col gap-3 md:gap-4">
          <p className="text-xl md:text-[26px] leading-snug text-[#bbb6ac]">
            You saved it because it mattered.
          </p>
          <p className="text-2xl md:text-[33px] leading-snug text-[#8a857b]">
            Then it disappeared into an app.
          </p>
          <p className="text-3xl md:text-[42px] leading-snug text-[#1a1a1a]">
            inklet gives it a place in the room.
          </p>
        </div>
      </div>
    </section>
  );
}
