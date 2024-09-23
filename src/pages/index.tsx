import Link from 'next/link';
import { HomeSEO } from '@/components/seo';
import { Hero } from '@/components/hero';
import { Button } from '@/components/shared/Button';
import { LastNews } from '@/components/last-news';
import { YandexAdBlock } from '@/components/shared/YandexAdBlock';

export default function Home() {
  const ButtonGotoNews = (
    <Link href={'/news'} title="Перейти к новостям">
      <Button variant="white">Перейти к новостям</Button>
    </Link>
  );

  const blockId = process.env.NEXT_PUBLIC_YANDEX_BLOCK_ID1 || '';

  return (
    <>
      <HomeSEO />
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
