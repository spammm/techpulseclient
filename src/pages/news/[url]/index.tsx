import Head from 'next/head';
import Script from 'next/script';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPostByUrl } from '@/api/postsApi';
import { IPost } from '@/types/post';
import { Tag } from '@/components/shared/Tag';
import { Source } from '@/components/post-sources';
import styles from './Post.module.scss';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const {
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: image?.src || `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName || 'Алина',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechPulse',
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
      </Head>

      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
        </section>

        <footer className={clsx(styles.postFooter, 'content-container')}>
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
