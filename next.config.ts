import type { NextConfig } from "next";
// assets.aceternity.com
// allow that
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["assets.aceternity.com"],
  },
};

export default nextConfig;
