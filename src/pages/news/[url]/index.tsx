import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Head from 'next/head';
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
import YandexAdBlock from '@/components/web-tools/YandexAdBlock';
import { UptolikeScript, UptolikeButtons } from '@/components/shared/social';
import { Comments } from '@/components/comments';

import styles from './Post.module.scss';
import 'react-medium-image-zoom/dist/styles.css';

const LastNews = dynamic(() => import('@/components/last-news'), {
  loading: () => <p>Загрузка последних новостей...</p>,
  ssr: false, // Указывает, что компонент должен рендериться только на клиенте
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

  //подключение зума для изображений в контенте
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: image?.src || `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${url}`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName || 'John Doe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Техпульс',
      logo: {
        '@type': 'ImageObject',
        url: `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`,
      },
    },
    description: subtitle || content.substring(0, 200),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${NEXT_PUBLIC_SITE_URL}/news/${url}`,
    },
  };

  return (
    <>
      <Head>
        <title>{`${title} | Tech Pulse`}</title>
        <meta name="description" content={subtitle || ''} />
        <meta name="keywords" content={keywords || ''} />
        {authorName && <meta name="author" content={authorName} />}

        <meta property="og:title" content={`${title} | Tech Pulse`} />
        <meta property="og:description" content={subtitle || ''} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${NEXT_PUBLIC_SITE_URL}/news/${url}`}
        />
        <meta
          property="og:image"
          content={
            image?.src || `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Tech Pulse`} />
        <meta name="twitter:description" content={subtitle || ''} />
        <meta
          name="twitter:image"
          content={
            image?.src || `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`
          }
        />
        <meta name="twitter:site" content="@TechPulse" />
        <meta name="twitter:creator" content="@TechPulse" />
      </Head>

      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <UptolikeScript key={id} />

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
          <YandexAdBlock blockId={blockId} />
        </section>

        <footer className={clsx(styles.postFooter, 'content-container')}>
          <div className={styles.social}>
            <span>Поделится в соцсетях:</span>
            <UptolikeButtons />
          </div>

          <ul className={styles.tags}>
            {tags.map((tag) => {
              return (
                <li key={tag} className={styles.tag}>
                  <Tag tag={tag} />
                </li>
              );
            })}
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
