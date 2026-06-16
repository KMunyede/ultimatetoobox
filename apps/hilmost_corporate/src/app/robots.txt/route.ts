export const dynamic = "force-static";

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /private/
Content-Signal: ai-train=no, search=yes, ai-input=no
Sitemap: https://hilmost.net/sitemap.xml`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
