import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@utilitiessite/ui", "@utilitiessite/config"],
  // Note: headers() are not supported with 'output: export'.
  // Cache-Control for static exports must be handled by the hosting provider (Firebase).
};

export default nextConfig;
