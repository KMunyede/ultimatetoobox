export const dynamic = "force-static";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://hilmost.net/api",
        "service-desc": [
          {
            href: "https://hilmost.net/openapi.json",
            type: "application/vnd.oai.openapi+json;version=3.1"
          }
        ],
        "service-doc": [
          {
            href: "https://hilmost.net/api/docs",
            type: "text/html"
          }
        ],
        status: [
          {
            href: "https://hilmost.net/api/health",
            type: "application/health+json"
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
