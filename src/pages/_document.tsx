import { Html, Head, Main, NextScript } from 'next/document';

const NEXT_SITE_URL = process.env.NEXT_SITE_URL || 'http://localhost:3000';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta
          name="description"
          content="Ваш источник последних технических новостей и будущих разработок"
        />

        <meta property="og:title" content="TechPulse - Новости технологий" />
        <meta
          property="og:description"
          content="Ваш источник последних технических новостей и будущих разработок"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${NEXT_SITE_URL}`} />
        <meta
          property="og:image"
          content={`${NEXT_SITE_URL}/android-chrome-192x192.png`}
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
          content={`${NEXT_SITE_URL}/android-chrome-192x192.png`}
        />
        <meta name="twitter:site" content="@TechPulse" />
        <meta name="twitter:creator" content="@TechPulse" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="технологии, новости, разработки, гаджеты, IT"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
