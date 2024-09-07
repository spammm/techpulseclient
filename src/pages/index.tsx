import Head from 'next/head';
import Link from 'next/link';
import { Hero } from '@/components/hero';
import { Button } from '@/components/shared/Button';
import { LastNews } from '@/components/last-news';
import YandexAdBlock from '@/components/web-tools/YandexAdBlock';

export default function Home() {
  const ButtonGotoNews = (
    <Link href={'/news'} title="Перейти к новостям">
      <Button variant="white">Перейти к новостям</Button>
    </Link>
  );

  const NEXT_PUBLIC_SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const blockId = process.env.NEXT_PUBLIC_YANDEX_BLOCK_ID1 || '';

  return (
    <>
      <Head>
        <title>Технический новостной портал</title>
        <meta
          name="description"
          content="Ваш источник последних технических новостей и будущих разработок"
        />
        <meta
          name="keywords"
          content="технологии, новости, разработки, гаджеты, IT"
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
      <Hero
        backgroundImage="/img/heropixel.webp"
        title="Добро пожаловать на TechPulse"
        text="Ваш источник последних технических новостей и будущих разработок"
        button={ButtonGotoNews}
      />
      <YandexAdBlock blockId={blockId} />
      <LastNews />
    </>
  );
}
