import Head from 'next/head';

export const HomeSEO: React.FC = () => {
  const NEXT_PUBLIC_SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <Head>
      <title>Портал технических новостей</title>
      <meta
        name="description"
        content="Ваш источник последних технических новостей и будущих разработок"
      />
      <meta
        name="keywords"
        content="технологии, новости, разработки, гаджеты, IT, новости технологий, последние технологии, самые новые технологии"
      />
      <meta property="og:title" content="TechPulse - Новости технологий" />
      <meta
        property="og:description"
        content="Ваш источник последних технических новостей и будущих разработок"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${NEXT_PUBLIC_SITE_URL}`} />
      <meta
        property="og:image"
        content={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
      />
      <meta property="og:site_name" content="TechPulse" />
      <meta property="og:locale" content="ru_RU" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TechPulse - Новости технологий" />
      <meta
        name="twitter:description"
        content="Ваш источник последних технических новостей и будущих разработок"
      />
      <meta
        name="twitter:image"
        content={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
      />
      <meta name="twitter:site" content="@TechPulse" />
      <meta name="twitter:creator" content="@TechPulse" />
    </Head>
  );
};

export default HomeSEO;
