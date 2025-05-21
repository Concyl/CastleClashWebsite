import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: config => {
    // Apply these settings only in development mode
      // Configure webpack to use polling for better file watching in Docker
      config.watchOptions = {
        poll: 500, // Check for changes every 500ms (more frequent)
        aggregateTimeout: 300, // Small delay before rebuilding
        ignored: ['**/node_modules', '**/.git', '**/.next'],
        followSymlinks: false,
      };
    return config;
  }
};

export default nextConfig;
