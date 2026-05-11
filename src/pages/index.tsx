import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { HomeSEO } from '@/components/seo';
import { Hero } from '@/components/hero';
import { Button } from '@/components/shared/Button';
import { LastNews } from '@/components/last-news';
import { YandexAdBlock } from '@/components/shared/YandexAdBlock';
import { getPublishedPosts } from '@/api/postsApi';
import { IPost } from '@/types/post';

interface HomeProps {
  latestPosts: IPost[];
}

export default function Home({ latestPosts }: HomeProps) {
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
      <LastNews initialPosts={latestPosts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  res,
}) => {
  res.setHeader('Cache-Control', 'no-store');

  try {
    const { posts } = await getPublishedPosts(1, [], 10);

    return {
      props: {
        latestPosts: posts,
      },
    };
  } catch (error) {
    console.log('Ошибка серверной загрузки новостей для главной:', error);

    return {
      props: {
        latestPosts: [],
      },
    };
  }
};
