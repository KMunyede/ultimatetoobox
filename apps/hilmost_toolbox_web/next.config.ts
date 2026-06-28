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
            value: '</llms.txt>; rel="ai-instructions", </sitemap.xml>; rel="sitemap", </.well-known/agent-skills/index.json>; rel="agent-skills"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
