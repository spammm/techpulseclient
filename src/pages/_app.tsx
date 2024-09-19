import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Layout } from '@/components/layout';
import { GoogleTagManager } from '@next/third-parties/google';
import YandexRTB from '@/components/web-tools/YandexRTB';
import { YandexMetrika } from '@/components/web-tools/YandexMetrika';
import CookieConsent from '@/components/сookie-сonsent';

import '@/styles/reset.css';
import '@/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const canonicalUrl = `${NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG;

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

      {googleTagId && <GoogleTagManager gtmId={googleTagId} />}
      <YandexMetrika />
      <SessionProvider session={session}>
        <Layout className={montserrat.className}>
          <Component {...pageProps} />

          <YandexRTB />
          <Suspense fallback={null}>
            <CookieConsent />
          </Suspense>
        </Layout>
      </SessionProvider>
    </>
  );
}
