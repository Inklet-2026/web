import { codeToHtml } from "shiki";

/**
 * Server-rendered syntax highlighting.
 *
 * Shiki runs at render time and ships nothing to the browser — the page
 * receives coloured markup, not a highlighter. `tokyo-night` is chosen
 * because the palette the site already uses for code is drawn from it, and
 * because Nextra highlights the docs site with the same engine.
 *
 * The theme's own background is stripped so the container keeps control of
 * it; the rest of the presentation lives in the `.shiki-block` rule in
 * globals.css, since the markup arrives as a string.
 */
export default async function CodeBlock({
  code,
  lang = "ts",
  filename,
  className = "",
}: {
  code: string;
  lang?: string;
  /** Shown in the strip above the snippet — usually the file it belongs in. */
  filename?: string;
  className?: string;
}) {
  const html = await codeToHtml(code, {
    lang,
    theme: "tokyo-night",
    transformers: [
      {
        pre(node) {
          const style = node.properties.style;
          if (typeof style === "string") {
            node.properties.style = style.replace(
              /background-color:[^;]*;?/,
              "",
            );
          }
        },
      },
    ],
  });

  return (
    <div
      className={`shiki-block bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden ${className}`}
    >
      {filename && (
        <div className="px-4 py-2.5 border-b border-[#2a2a2a]">
          <span className="text-[11px] font-[family-name:var(--font-ibm-plex-mono)] text-[#5c5c5c]">
            {filename}
          </span>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
