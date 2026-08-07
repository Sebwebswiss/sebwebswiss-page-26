import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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