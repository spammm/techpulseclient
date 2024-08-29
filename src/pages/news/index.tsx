import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NewsList } from '@/components/news';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPublishedPosts } from '../../api/postsApi';
import { IPost } from '@/types/post';
import { Pagination } from '@/components/pagination';
import { Tag } from '@/components/shared/Tag';
import styles from '../../styles/NewsPage.module.scss';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { tags } = router.query;

  const tagsArray = useMemo(() => {
    if (typeof tags === 'string') {
      return tags.split(',').map((tag) => tag.trim());
    } else if (Array.isArray(tags)) {
      return tags;
    }
    return [];
  }, [tags]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { posts, totalPages } = await getPublishedPosts(page, tagsArray);
      setPosts(posts);
      setTotalPages(totalPages);
    };

    fetchPosts();
  }, [page, tagsArray]);

  const pageTitle =
    tagsArray.length > 0
      ? `Новости по тегу: ${tagsArray.join(', ')}`
      : 'Все новости';
  const pageDescription =
    'Читать последние технические новости и статьи на TechPulse. Оставайтесь в курсе последних событий в мире технологий.';

  return (
    <>
      <Head>
        <title>{`${pageTitle} | TechPulse`}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        />
        <meta
          property="og:image"
          content={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
        />
        <meta property="og:site_name" content="TechPulse" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
        />
      </Head>
      <div className={styles.newsPage}>
        <div className="content-container">
          <Breadcrumbs
            lastText={
              tags ? (
                <>
                  Фильтр:
                  {tagsArray.map((tag) => (
                    <Tag key={tag} type="small" tag={tag} />
                  ))}
                </>
              ) : (
                'Все новости'
              )
            }
          />
          <NewsList newsData={posts} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
