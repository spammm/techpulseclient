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
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-48x48.ico`}
          type="image/x-icon"
          sizes="any"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-192x192.png`}
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-180x180.png`}
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/tehpulse-favicon-color.png`}
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-120x120.png`}
          sizes="120x120"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-16x16.png`}
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          href={`${NEXT_PUBLIC_SITE_URL}/logo-color-180x180.png`}
        />
        <link
          rel="icon"
          href="/tehpulse-favicon-color.svg"
          type="image/svg+xml"
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
