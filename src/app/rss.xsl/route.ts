export function GET() {
  return new Response(null, {
    status: 308,
    headers: { Location: "/journal/rss.xsl" },
  });
}
