const apiServer = process.env.NEXT_PUBLIC_API_SERVER || 'http://localhost:3005';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const environment =
  process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NEXT_PUBLIC_ENV;

const apiServerHostname = new URL(apiServer).hostname;
const siteUrlHostname = new URL(siteUrl).hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: environment === 'stage',
  env: {
    NEXT_PUBLIC_API_SERVER: apiServer,
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_ENVIRONMENT: environment,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: apiServerHostname,
      },
      {
        protocol: 'http',
        hostname: siteUrlHostname,
      },
      {
        protocol: 'https',
        hostname: apiServerHostname,
      },
      {
        protocol: 'https',
        hostname: siteUrlHostname,
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
