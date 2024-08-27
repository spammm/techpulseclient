/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async redirects() {
    return [
      {
        source: '/news/:slug*',
        has: [
          {
            type: 'host',
            value: 'www.tehpulse.ru',
          },
        ],
        destination: 'https://tehpulse.ru/news/:slug*',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.tehpulse.ru',
          },
        ],
        destination: 'https://tehpulse.ru/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
