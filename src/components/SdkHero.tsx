import Rise from "@/components/Rise";
import CodeBlock from "@/components/CodeBlock";
import { DOCS_URL, GITHUB_URL, PACKAGE_NAME, SDK_VERSION } from "@/data/sdk";

const EXAMPLE = `import { Inklet } from "@inklethq/sdk";

const inklet = new Inklet({ pat: process.env.INKLET_PAT! });

await inklet.push.auto({
  title: "Daily brief",
  intent: "Make the key update easy to scan",
  assets: [
    inklet.assets.text("Revenue is up 12% week over week."),
    inklet.assets.link("https://example.com/report"),
  ],
});`;

export default function SdkHero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        <div>
          <Rise>
            <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3">
              Developers
            </p>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              inklet Portal SDK
            </h1>
          </Rise>

          <Rise delay={0.15}>
            <p className="text-lg text-[#888] leading-relaxed max-w-lg">
              A server-side TypeScript client for the paper on your walls. Hand
              it text, a link, an image, or a PDF — Inklet does the layout,
              picks the room, and renders for the panel.
            </p>
          </Rise>

          <Rise delay={0.25} className="mt-8">
            <div className="inline-flex items-center gap-3 border border-[#2a2a2a] bg-[#111] rounded-lg px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[13px]">
              <span className="text-[#555] select-none">$</span>
              <span className="text-[#c9c6be]">npm install {PACKAGE_NAME}</span>
            </div>
            <p className="text-[11px] font-[family-name:var(--font-ibm-plex-mono)] text-[#555] mt-2.5 tracking-wide">
              {`v${SDK_VERSION} · Node 20+ · ESM & CommonJS`}
            </p>
          </Rise>

          <Rise delay={0.35} className="flex items-center gap-4 mt-8">
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 bg-[#f5f3ed] text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#e8e5db] transition-colors"
            >
              Read the docs
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 border border-[#333] text-[#888] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
            >
              View on GitHub
            </a>
          </Rise>
        </div>

        <Rise delay={0.3}>
          <CodeBlock code={EXAMPLE} filename="brief.ts" />
        </Rise>
      </div>
    </section>
  );
}
