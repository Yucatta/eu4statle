import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://www.yucatta.com http://localhost:3000",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors https://www.yucatta.com http://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
