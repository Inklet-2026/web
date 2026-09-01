import { journalPosts, type JournalBlock } from "@/data/journal";

const SITE_URL = "https://iminklet.com";
const JOURNAL_URL = `${SITE_URL}/journal`;
const FEED_URL = `${SITE_URL}/rss.xml`;

export const dynamic = "force-static";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeXml(value: string) {
  return escapeHtml(value);
}

function cdata(value: string) {
  return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function renderBlock(block: JournalBlock) {
  if (block.type === "heading") {
    return `<h2>${escapeHtml(block.text)}</h2>`;
  }

  if (block.type === "quote") {
    return `<blockquote>${escapeHtml(block.text)}</blockquote>`;
  }

  if (block.type === "code") {
    const language = block.lang
      ? ` class="language-${escapeHtml(block.lang)}"`
      : "";
    const filename = block.filename
      ? `<p><strong>${escapeHtml(block.filename)}</strong></p>`
      : "";

    return `${filename}<pre><code${language}>${escapeHtml(block.code)}</code></pre>`;
  }

  if (block.type === "links") {
    const links = block.links
      .map(
        (link) =>
          `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`,
      )
      .join("");

    return `<ul>${links}</ul>`;
  }

  return `<p>${escapeHtml(block.text)}</p>`;
}

function renderPostContent(post: (typeof journalPosts)[number]) {
  const image = post.image
    ? `<p><img src="${SITE_URL}${escapeHtml(post.image)}" alt="${escapeHtml(
        post.imageAlt ?? post.title,
      )}" width="1200" height="630" /></p>`
    : "";

  return `${image}${post.blocks.map(renderBlock).join("")}`;
}

export function GET() {
  const posts = [...journalPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const lastBuildDate = new Date(
    `${posts[0]?.publishedAt ?? "2026-01-01"}T12:00:00Z`,
  ).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${JOURNAL_URL}/${post.slug}`;
      const publishedAt = new Date(
        `${post.publishedAt}T12:00:00Z`,
      ).toUTCString();

      return `
    <item>
      <title>${cdata(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${publishedAt}</pubDate>
      <dc:creator>${cdata(post.author)}</dc:creator>
      <category>${cdata(post.category)}</category>
      <description>${cdata(post.excerpt)}</description>
      <content:encoded>${cdata(renderPostContent(post))}</content:encoded>
    </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>inklet Journal</title>
    <link>${JOURNAL_URL}</link>
    <description>Product stories, field notes, and ideas from inklet about ambient computing and e-ink.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>inklet Journal</title>
      <link>${JOURNAL_URL}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
