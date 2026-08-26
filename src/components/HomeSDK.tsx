import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

const highlights = [
  "One call puts words on a wall",
  "Server-side TypeScript, fully typed",
  "Portal cloud, or your own Compute Hub",
];

const EXAMPLE = `import { Inklet } from "@inklethq/sdk";

const inklet = new Inklet({ pat: process.env.INKLET_PAT! });

await inklet.push.auto({
  title: "Grocery list",
  assets: [
    inklet.assets.text("Milk, eggs, coffee"),
  ],
});`;

export default function HomeSDK() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow text-[#aaa] mb-3">
            SDK
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5">
            inklet Portal SDK
          </h2>
          <p className="text-[#666] leading-relaxed mb-6 max-w-md">
            Build custom integrations for your inklet displays. Hand the SDK
            text, a link, an image, or a PDF — Inklet does the layout, picks the
            room, and renders for the panel.
          </p>
          <ul className="space-y-2 mb-8">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm text-[#888]"
              >
                <span className="w-1 h-1 rounded-full bg-[#aaa] shrink-0" />
                {h}
              </li>
            ))}
          </ul>
          <Link
            href="/developers"
            className="inline-flex items-center px-6 py-3 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Explore the SDK
          </Link>
        </div>

        <div>
          <CodeBlock code={EXAMPLE} />
        </div>
      </div>
    </section>
  );
}
