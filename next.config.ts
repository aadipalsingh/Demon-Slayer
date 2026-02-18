import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable unoptimized mode for placeholder SVG assets
    // Remove this when real image assets are added
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
