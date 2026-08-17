import CodeBlock from "@/components/CodeBlock";
import { API_BASE_URL, MAX_ASSETS_PER_CONTENT, MAX_ASSET_SIZE_MIB } from "@/data/sdk";

const ERRORS = `import { InkletError, RateLimitError } from "@inklethq/sdk";

try {
  await inklet.displays.list();
} catch (error) {
  if (error instanceof RateLimitError) {
    // Retry on your own schedule.
  } else if (error instanceof InkletError) {
    console.error(error.code, error.status, error.requestId);
  }
}`;

const guardrails = [
  {
    title: "Server-only, by construction",
    body: "Constructing the client where a document exists throws before a request is made. A personal access token cannot end up in a browser bundle by accident.",
  },
  {
    title: "Uploads never carry the token",
    body: "Binary assets go straight to temporary storage URLs. The token is sent only to Inklet endpoints, and requests refuse absolute URLs and cross-origin redirects.",
  },
  {
    title: "Safe to replay",
    body: "Every push takes an idempotency key. Omit it and the SDK generates one, then hands it back — so your retry is the same call, not a second one.",
  },
  {
    title: "Errors you can act on",
    body: "Every error extends InkletError and keeps the backend code, HTTP status, request ID, and structured details. Credentials are redacted from messages.",
  },
];

export default function SdkGuardrails() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3">
          Guardrails
        </p>
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-16 max-w-2xl leading-snug">
          A key that reaches your walls deserves care.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12 mb-20">
          {guardrails.map((item) => (
            <div key={item.title}>
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-3">
                {item.title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px] max-w-md">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <CodeBlock code={ERRORS} filename="errors.ts" />

          <div className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-3">
                Or keep it off the cloud entirely
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px] max-w-md">
                The service address defaults to{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#c9c6be]">
                  {API_BASE_URL.replace("https://", "")}
                </span>{" "}
                while the SDK is in developer preview. Point{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#c9c6be]">
                  baseUrl
                </span>{" "}
                at a Compute Hub instead and the same code runs without anything
                leaving your network.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-[#2a2a2a]">
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#f5f3ed] font-light">
                  {MAX_ASSET_SIZE_MIB} MiB
                </p>
                <p className="text-[12.5px] text-[#666] mt-1">
                  per binary asset
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#f5f3ed] font-light">
                  {MAX_ASSETS_PER_CONTENT}
                </p>
                <p className="text-[12.5px] text-[#666] mt-1">
                  assets per push
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#f5f3ed] font-light">
                  3
                </p>
                <p className="text-[12.5px] text-[#666] mt-1">
                  output formats
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
