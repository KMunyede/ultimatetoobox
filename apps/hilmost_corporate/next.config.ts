import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ["@utilitiessite/ui"],
};

export default nextConfig;
