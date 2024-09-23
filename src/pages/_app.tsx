import type { AppProps } from 'next/app';
import { Layout } from '@/components/layout';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@/components/analytics';
import { GlobalSEO } from '@/components/seo';
import { CookieConsentWrapper } from '@/components/cookie-consent';
import { montserrat } from '@/components/fonts';

import '@/styles/reset.css';
import '@/styles/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <GlobalSEO />
      <SessionProvider session={session}>
        <Layout className={montserrat.className}>
          <Component {...pageProps} />
          <Analytics />
          <CookieConsentWrapper />
        </Layout>
      </SessionProvider>
    </>
  );
}
