import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@utilitiessite/ui", "@utilitiessite/config"],
  trailingSlash: true,
  // Note: headers() are not supported with 'output: export'.
  // Cache-Control for static exports must be handled by the hosting provider (Firebase).
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
              '</llms.txt>; rel="describedby"',
              '</sitemap.xml>; rel="sitemap"'
            ].join(', '),
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
