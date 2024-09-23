import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NewsList } from '@/components/news';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPublishedPosts } from '@/api/postsApi';
import { IPost } from '@/types/post';
import { Pagination } from '@/components/pagination';
import { Tag } from '@/components/shared/Tag';
import { MetaTags } from '@/components/seo';

import styles from '../../styles/NewsPage.module.scss';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const NewsPage: React.FC = () => {
  const router = useRouter();
  const { tags } = router.query;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tagsArray = useMemo(() => {
    if (typeof tags === 'string') {
      return tags.split(',').map((tag) => tag.trim());
    } else if (Array.isArray(tags)) {
      return tags;
    }
    return [];
  }, [tags]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { posts, totalPages } = await getPublishedPosts(page, tagsArray);
      setPosts(posts);
      setTotalPages(totalPages);
    } catch (error) {
      setErrorMessage('Ошибка загрузки статей. Попробуйте позже.');
      console.log('Ошибка загрузки статей:', error);
    } finally {
      setLoading(false);
    }
  }, [page, tagsArray]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const pageTitle =
    tagsArray.length > 0
      ? `Новости по тегу: ${tagsArray.join(', ')}`
      : 'Все новости';
  const pageDescription =
    'Читать последние технические новости и статьи на TechPulse. Оставайтесь в курсе последних событий в мире технологий.';

  return (
    <>
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords="Самые последние технические новости, новинки технологий, что последнее изобрели в мире, последние гаджеты"
        url={`${NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        image={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
      />

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
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <>
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
              <NewsList newsData={posts} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
