import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader'
    })

    if(!isServer) config.externals.push('canvas');
    return config;
  }
};

export default nextConfig;
