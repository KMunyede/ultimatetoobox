export const dynamic = "force-static";

export async function GET() {
  const robotsTxt = `# Content Signals (https://contentsignals.org/)
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /cdn-cgi/
Disallow: /*?val1=*
Disallow: /*?unit1=*
Disallow: /*?val2=*
Disallow: /*?unit2=*
Disallow: /*?sourceZone=*
Disallow: /*?sourceTime=*
Disallow: /*?targetZones=*
Disallow: /*?team=*

User-agent: gptbot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /cdn-cgi/
Disallow: /*?val1=*
Disallow: /*?unit1=*
Disallow: /*?val2=*
Disallow: /*?unit2=*
Disallow: /*?sourceZone=*
Disallow: /*?sourceTime=*
Disallow: /*?targetZones=*
Disallow: /*?team=*

User-agent: anthropic-ai
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /cdn-cgi/
Disallow: /*?val1=*
Disallow: /*?unit1=*
Disallow: /*?val2=*
Disallow: /*?unit2=*
Disallow: /*?sourceZone=*
Disallow: /*?sourceTime=*
Disallow: /*?targetZones=*
Disallow: /*?team=*

User-agent: perplexitybot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /cdn-cgi/
Disallow: /*?val1=*
Disallow: /*?unit1=*
Disallow: /*?val2=*
Disallow: /*?unit2=*
Disallow: /*?sourceZone=*
Disallow: /*?sourceTime=*
Disallow: /*?targetZones=*
Disallow: /*?team=*

User-agent: cohere-ai
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /cdn-cgi/
Disallow: /*?val1=*
Disallow: /*?unit1=*
Disallow: /*?val2=*
Disallow: /*?unit2=*
Disallow: /*?sourceZone=*
Disallow: /*?sourceTime=*
Disallow: /*?targetZones=*
Disallow: /*?team=*

User-agent: meta-externalagent
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /cdn-cgi/
Disallow: /*?val1=*
Disallow: /*?unit1=*
Disallow: /*?val2=*
Disallow: /*?unit2=*
Disallow: /*?sourceZone=*
Disallow: /*?sourceTime=*
Disallow: /*?targetZones=*
Disallow: /*?team=*

Sitemap: https://hilmost-toolbox.hilmost.net/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
