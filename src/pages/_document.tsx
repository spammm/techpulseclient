import { Html, Head, Main, NextScript } from 'next/document';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="manifest" href={`${NEXT_PUBLIC_SITE_URL}/manifest.json`} />
        <link
          rel="icon"
          href={`${NEXT_PUBLIC_SITE_URL}/favicon.ico`}
          type="image/x-icon"
          sizes="any"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/favicon-192x192.png`}
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/apple-touch-icon.png`}
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/favicon-120x120.png`}
          sizes="120x120"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/favicon-16x16.png`}
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          href={`${NEXT_PUBLIC_SITE_URL}/apple-touch-icon.png`}
        />

        <meta name="robots" content="index, follow" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
