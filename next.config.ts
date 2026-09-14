import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        source: "/qui-sommes-nous.html",
        destination: "/a-propos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;