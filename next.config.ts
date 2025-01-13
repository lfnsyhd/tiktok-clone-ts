import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader'
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };

    if(!isServer) config.externals.push('canvas');
    return config;
  }
};

export default nextConfig;
