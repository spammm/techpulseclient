/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: new URL(process.env.NEXT_PUBLIC_API_SERVER).hostname,
      },
      {
        protocol: 'http',
        hostname: new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname,
      },
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_API_SERVER).hostname,
      },
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname,
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      {
        source: '/rss.xml',
        destination: '/api/rss.xml',
      },
    ];
  },
};

export default nextConfig;
