import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/delta/:path*',
        destination: 'https://wifi.delta.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;

