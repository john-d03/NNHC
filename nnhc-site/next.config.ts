import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/vision", destination: "/model", permanent: true },
    ];
  },
};

export default nextConfig;
