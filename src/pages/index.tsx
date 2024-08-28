import Head from 'next/head';
import Link from 'next/link';
import { Hero } from '@/components/hero';
import { Button } from '@/components/shared/Button';
import { LastNews } from '@/components/last-news/LastNews';

export default function Home() {
  const ButtonGotoNews = (
    <Link href={'/news'} title="Перейти к новостям">
      <Button variant="white">Перейти к новостям</Button>
    </Link>
  );

  return (
    <>
      <Head>
        <title>Технический новостной портал</title>
      </Head>
      <Hero
        backgroundImage="/img/heropixel.webp"
        title="Добро пожаловать на TechPulse"
        text="Ваш источник последних технических новостей и будущих разработок"
        button={ButtonGotoNews}
      />
      <LastNews />
    </>
  );
}
