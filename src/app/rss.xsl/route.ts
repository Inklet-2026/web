export const dynamic = "force-static";

const stylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  exclude-result-prefixes="dc"
>
  <xsl:output method="html" encoding="UTF-8" omit-xml-declaration="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="rss/channel/title" /></title>
        <link rel="icon" href="/logo_light.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&amp;family=Inter:wght@400;500&amp;family=Newsreader:opsz,wght@6..72,300;6..72,400&amp;display=swap" rel="stylesheet" />
        <style>
          :root {
            color-scheme: light;
            --paper: #f5f3ed;
            --ink: #1a1a1a;
            --muted: #6f6c65;
            --faint: #aaa69d;
            --line: #dedbd2;
          }

          * { box-sizing: border-box; }

          html { background: var(--paper); }

          body {
            margin: 0;
            background: var(--paper);
            color: var(--ink);
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            -webkit-font-smoothing: antialiased;
          }

          a { color: inherit; }

          .shell {
            width: min(100% - 48px, 1104px);
            margin: 0 auto;
          }

          .nav {
            height: 76px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .brand {
            font-family: Newsreader, Georgia, serif;
            font-size: 25px;
            font-weight: 400;
            text-decoration: none;
          }

          .journal-link {
            color: var(--muted);
            font-size: 13px;
            text-decoration: none;
          }

          .journal-link:hover { color: var(--ink); }

          .hero {
            padding: 128px 0 112px;
            max-width: 760px;
          }

          .eyebrow,
          .meta {
            font-family: "IBM Plex Mono", monospace;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .eyebrow { color: var(--faint); }

          h1 {
            margin: 18px 0 0;
            font-family: Newsreader, Georgia, serif;
            font-size: clamp(46px, 6vw, 68px);
            font-weight: 300;
            letter-spacing: -0.025em;
            line-height: 1.02;
          }

          .intro {
            margin: 28px 0 0;
            max-width: 650px;
            color: var(--muted);
            font-size: 17px;
            line-height: 1.7;
          }

          .subscribe {
            margin-top: 30px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border: 1px solid var(--line);
            color: var(--muted);
            font-size: 13px;
          }

          .subscribe code {
            color: var(--ink);
            font-family: "IBM Plex Mono", monospace;
            font-size: 12px;
          }

          .feed {
            border-top: 1px solid var(--line);
          }

          .entry {
            display: grid;
            grid-template-columns: 160px minmax(0, 1fr) auto;
            gap: 40px;
            padding: 34px 0;
            border-bottom: 1px solid var(--line);
            text-decoration: none;
          }

          .meta {
            color: var(--faint);
            line-height: 1.75;
          }

          .entry h2 {
            margin: 0;
            font-family: Newsreader, Georgia, serif;
            font-size: clamp(28px, 3vw, 36px);
            font-weight: 300;
            letter-spacing: -0.015em;
            line-height: 1.08;
            transition: color 160ms ease;
          }

          .entry p {
            margin: 13px 0 0;
            max-width: 760px;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.75;
          }

          .arrow {
            padding-top: 4px;
            color: var(--faint);
            transition: transform 160ms ease, color 160ms ease;
          }

          .entry:hover h2 { color: var(--muted); }
          .entry:hover .arrow { color: var(--ink); transform: translateX(4px); }

          footer {
            padding: 46px 0 42px;
            display: flex;
            justify-content: space-between;
            gap: 24px;
            color: var(--faint);
            font-size: 12px;
          }

          footer a { text-underline-offset: 3px; }

          @media (max-width: 720px) {
            .shell { width: min(100% - 48px, 1104px); }
            .hero { padding: 92px 0 80px; }
            .subscribe { align-items: flex-start; flex-direction: column; }
            .subscribe code { overflow-wrap: anywhere; }
            .entry { grid-template-columns: 1fr auto; gap: 12px 18px; padding: 28px 0; }
            .meta { grid-column: 1 / -1; }
            footer { flex-direction: column; }
          }
        </style>
      </head>
      <body>
        <div class="shell">
          <nav class="nav" aria-label="Primary navigation">
            <a class="brand" href="/">inklet</a>
            <a class="journal-link" href="/journal">Read on the web →</a>
          </nav>

          <main>
            <header class="hero">
              <div class="eyebrow">Journal · RSS</div>
              <h1>The inklet Journal, delivered quietly.</h1>
              <p class="intro"><xsl:value-of select="rss/channel/description" /></p>
              <div class="subscribe">
                <span>Subscribe with</span>
                <code>https://www.iminklet.com/rss.xml</code>
              </div>
            </header>

            <section class="feed" aria-label="Journal entries">
              <xsl:for-each select="rss/channel/item">
                <a class="entry" href="{link}">
                  <div class="meta">
                    <time><xsl:value-of select="substring(pubDate, 6, 11)" /></time>
                    <br />
                    <xsl:value-of select="category" />
                  </div>
                  <div>
                    <h2><xsl:value-of select="title" /></h2>
                    <p><xsl:value-of select="description" /></p>
                  </div>
                  <span class="arrow" aria-hidden="true">→</span>
                </a>
              </xsl:for-each>
            </section>
          </main>

          <footer>
            <span>Ambient e-ink displays for your second brain.</span>
            <span>RSS 2.0 · <a href="/journal">inklet Journal</a></span>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

export function GET() {
  return new Response(stylesheet, {
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
