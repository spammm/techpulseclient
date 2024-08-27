import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Layout } from '@/components/layout';
import '@/styles/reset.css';
import '@/styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <Layout className={montserrat.className}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
