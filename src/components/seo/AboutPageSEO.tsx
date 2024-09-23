import Head from 'next/head';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const AboutPageSEO: React.FC = () => (
  <Head>
    <title>О нас | ТехПульс</title>
    <meta
      name="description"
      content="Узнайте больше о команде ТехПульс и нашей миссии."
    />
    <meta property="og:title" content="О нас | ТехПульс" />
    <meta
      property="og:description"
      content="Узнайте больше о команде ТехПульс и нашей миссии."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${NEXT_PUBLIC_SITE_URL}/about`} />
    <meta
      property="og:image"
      content={`${NEXT_PUBLIC_SITE_URL}/path-to-image.jpg`}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="О нас | ТехПульс" />
    <meta
      name="twitter:description"
      content="Узнайте больше о команде ТехПульс и нашей миссии."
    />
    <meta
      name="twitter:image"
      content={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
    />

    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TechPulse',
        url: NEXT_PUBLIC_SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@techpulse.com',
          contactType: 'customer service',
          areaServed: 'RU',
          availableLanguage: 'Russian',
        },
        sameAs: ['https://t.me/tekhulse'],
      })}
    </script>
  </Head>
);

export default AboutPageSEO;
