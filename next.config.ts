import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
images: {
  remotePatterns: [
    {
      hostname: "**", // Allow any domain
      pathname: "/**", // Allow any path
    },
  ],
  },
};

export default nextConfig;
