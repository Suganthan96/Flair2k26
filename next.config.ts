import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 blocks query strings on local image sources by default (to
    // prevent enumeration attacks against arbitrary optimizer params) —
    // allow them under /assets/**, since that's already a fully public,
    // fixed set of static files and we rely on a `?v=N` query string to
    // cache-bust replaced images that keep the same filename.
    localPatterns: [
      {
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
