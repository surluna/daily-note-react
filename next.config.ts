import type { NextConfig } from "next";
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
