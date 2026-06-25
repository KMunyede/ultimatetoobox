import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@utilitiessite/ui"],
  trailingSlash: true,
};

export default nextConfig;
