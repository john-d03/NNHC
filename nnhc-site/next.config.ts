import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/vision", destination: "/model", permanent: true },
    ];
  },
};

export default nextConfig;
