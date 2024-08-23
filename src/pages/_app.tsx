import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Layout } from '@/components/layout';
import '@/styles/reset.css';
import '@/styles/globals.css';
import Head from 'next/head';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout className={montserrat.className}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
