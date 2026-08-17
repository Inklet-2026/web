import { DOCS_URL, GITHUB_URL, NPM_URL, PACKAGE_NAME } from "@/data/sdk";

const steps = [
  {
    number: "01",
    title: "Create a token",
    body: "Personal access tokens are issued in the Portal dashboard and scoped to your displays.",
  },
  {
    number: "02",
    title: "Install the package",
    body: `npm install ${PACKAGE_NAME} — Node 20 or newer, ESM or CommonJS, types included.`,
  },
  {
    number: "03",
    title: "Push something",
    body: "One call puts words on a wall. Everything else is refinement.",
  },
];

export default function SdkStart() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light text-center mb-4">
          Start with a token.
        </h2>
        <p className="text-[15px] text-[#888] text-center mb-16 max-w-lg mx-auto leading-relaxed">
          The SDK is in developer preview. The surface is small on purpose and
          stable enough to build on; breaking changes are announced in the
          changelog.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#555] tracking-wider">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mt-2.5 mb-3">
                {step.title}
              </h3>
              <p className="text-[14px] text-[#888] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
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
            GitHub
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3 border border-[#333] text-[#888] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
          >
            npm
          </a>
        </div>
      </div>
    </section>
  );
}
