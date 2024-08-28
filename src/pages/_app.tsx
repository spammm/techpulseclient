import React, { Suspense } from 'react';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Layout } from '@/components/layout';
import '@/styles/reset.css';
import '@/styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { GoogleTagManager } from '@next/third-parties/google';

const CookieConsent = React.lazy(() => import('../components/сookie-сonsent'));

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const NEXT_PUBLIC_SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
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

      {yandexMetrikaId && (
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${yandexMetrikaId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
              });
            `,
          }}
          async
        />
      )}

      {yandexMetrikaId && (
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      )}

      <Layout className={montserrat.className}>
        <Component {...pageProps} />
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      </Layout>
    </>
  );
}
