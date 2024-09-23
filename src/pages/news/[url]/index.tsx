import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Script from 'next/script';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Zoom from 'react-medium-image-zoom';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPostByUrl, incrementViewCount } from '@/api/postsApi';
import { IPost } from '@/types/post';
import { Tag } from '@/components/shared/Tag';
import { Source } from '@/components/post-sources';
import { YandexAdBlock } from '@/components/shared/YandexAdBlock';
import { UptolikeScript, UptolikeButtons } from '@/components/shared/social';
import { Comments } from '@/components/comments';
import { MetaTags, PostPageSEO } from '@/components/seo';

import styles from './Post.module.scss';
import 'react-medium-image-zoom/dist/styles.css';

const LastNews = dynamic(() => import('@/components/last-news'), {
  loading: () => <p>Загрузка последних новостей...</p>,
  ssr: false,
});

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const blockId = process.env.NEXT_PUBLIC_YANDEX_BLOCK_ID3 || '';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const {
    id,
    title,
    subtitle,
    image,
    content,
    keywords,
    authorName,
    publishedAt,
    tags,
    sources,
  } = post;
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (id && typeof window !== 'undefined') {
      incrementViewCount(id);
    }
  }, [id]);

  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>(
      `.${styles.postContentWrapper} img`
    );

    images.forEach((img) => {
      const zoomWrapper = document.createElement('div');
      zoomWrapper.classList.add('zoom-wrapper');

      const zoomComponent = (
        <Zoom
          zoomImg={{
            src: img.getAttribute('data-zoom-src') || img.src,
            alt: img.alt,
            width: img.width,
            height: img.height,
            srcSet: undefined,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img?.width || 800}
            height={img?.height || 600}
            quality={80}
            data-zoom-src={img.src}
          />
        </Zoom>
      );

      img.parentNode?.replaceChild(zoomWrapper, img);
      const root = createRoot(zoomWrapper);
      root.render(zoomComponent);
    });
  }, [content]);

  return (
    <>
      <PostPageSEO
        title={`${title} | ТехПульс`}
        description={subtitle || ''}
        keywords={keywords || ''}
        url={`${NEXT_PUBLIC_SITE_URL}/news/${url}`}
        authorName={authorName}
        publishedAt={publishedAt}
        image={
          image?.src || `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`
        }
      />

      <UptolikeScript />

      <article className={styles.post}>
        <div className="content-container">
          <Breadcrumbs lastText={title} />
        </div>

        <header className={clsx(styles.postHeader, 'content-container')}>
          <h1 className={styles.postTitle}>{title}</h1>
          <div className={styles.postSubtitle}>{subtitle}</div>
          <time dateTime={new Date(publishedAt).toISOString()}>
            {new Date(publishedAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </header>

        <section className={clsx(styles.postContent, 'content-container')}>
          <div className={styles.postContentWrapper}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <YandexAdBlock blockId={blockId} key={id} />
        </section>

        <footer className={clsx(styles.postFooter, 'content-container')}>
          <div className={styles.social}>
            <span>Поделится в соцсетях:</span>
            <UptolikeButtons key={id} />
          </div>

          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
          <div className={styles.sources}>
            <span>Источники:</span>
            {sources.map((source) => (
              <Source key={source.name} source={source} />
            ))}
          </div>
          <div className={styles.comments}>
            <Comments postId={id} key={id} />
          </div>
          <section className="content-container">
            <h3>Смотрите также последние новости с главной страницы</h3>
            <LastNews />
          </section>
        </footer>
      </article>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.query;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=60'
  );

  try {
    const post = await getPostByUrl(url as string);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      notFound: true,
    };
  }
};
