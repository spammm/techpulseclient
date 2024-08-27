import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getAdjacentPosts, getPostByUrl } from '@/api/postsApi';
import { IPost } from '@/types/post';
// import { PostNavigation } from '@/components/post-navigatrion';
import { Tag } from '@/components/shared/Tag';
import styles from './Post.module.scss';
import { Source } from '@/components/post-sources';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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

  // const [prevPostUrl, setPrevPostUrl] = useState<string | undefined>();
  // const [nextPostUrl, setNextPostUrl] = useState<string | undefined>();

  // useEffect(() => {
  //   const fetchAdjacentPosts = async () => {
  //     const { prevPostUrl, nextPostUrl } = await getAdjacentPosts(id);
  //     setPrevPostUrl(prevPostUrl);
  //     setNextPostUrl(nextPostUrl);
  //   };

  //   fetchAdjacentPosts();
  // }, [id]);

  return (
    <>
      <Head>
        <title>{title} | Tech Pulse</title>
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
          {/* <PostNavigation prevPostUrl={prevPostUrl} nextPostUrl={nextPostUrl} /> */}
        </footer>
      </article>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.query;
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
