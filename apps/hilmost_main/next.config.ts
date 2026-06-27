import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@utilitiessite/ui"],
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</llms.txt>; rel="ai-instructions", </sitemap.xml>; rel="sitemap"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
