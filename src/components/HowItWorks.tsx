import Link from "next/link";
import { SiNotion, SiObsidian } from "react-icons/si";
import { HiOutlineDocumentText } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Send what matters",
    description:
      "Text, a URL, an image, a PDF, a file. From the share sheet, a widget, Siri, a Shortcut, or the Action button — wherever you already are when you save something.",
    icons: true,
  },
  {
    number: "02",
    title: "Choose a display",
    description:
      "You pick the room. inklet can suggest one when it's confident about where something belongs — but it never moves things on its own.",
    icons: false,
  },
  {
    number: "03",
    title: "Let it stay visible",
    description:
      "It stays on the panel until you replace it. No notification, no badge, nothing asking to be dismissed. e-ink means no backlight and no eye strain — it sits in your space like a picture frame, not a gadget.",
    icons: false,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase mb-4">
            Feature
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light">
            Send once. Look up.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#aaa] tracking-wider">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {step.title}
              </h3>
              <p className="text-[#666] leading-relaxed text-[15px]">
                {step.description}
              </p>

              {step.icons && (
                <div className="flex items-center gap-4 mt-6 text-[#999]">
                  <SiNotion size={20} title="Notion" />
                  <HiOutlineDocumentText size={22} title="Craft" />
                  <SiObsidian size={20} title="Obsidian" />
                  <span className="text-xs text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)]">
                    + more
                  </span>
                </div>
              )}

              {step.number === "01" && (
                <Link
                  href="/portal"
                  className="inline-block mt-4 text-xs text-[#aaa] hover:text-[#1a1a1a] transition-colors font-[family-name:var(--font-ibm-plex-mono)]"
                >
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
