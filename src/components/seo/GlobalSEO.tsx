import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const GlobalSEO: React.FC = () => {
  const router = useRouter();
  const canonicalUrl = `${NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Поиск на TechPulse',
    url: NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href={`${NEXT_PUBLIC_SITE_URL}/rss.xml`}
        />
        <meta
          name="yandex-verification"
          content={`${process.env.NEXT_PUBLIC_YANDEX_VERIFICATION}`}
        />
        <meta
          name="google-site-verification"
          content={`${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default GlobalSEO;
