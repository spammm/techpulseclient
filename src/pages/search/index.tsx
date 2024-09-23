import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NewsList } from '@/components/news';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPublishedPosts } from '@/api/postsApi';
import { IPost } from '@/types/post';
import { Pagination } from '@/components/pagination';
import { SearchBar } from '@/components/SearchBar';
import { MetaTags } from '@/components/seo';

import styles from '../../styles/NewsPage.module.scss';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof q === 'string') {
      setSearchTerm(q);
    } else {
      setSearchTerm('');
    }
  }, [q]);

  const handleSearch = (query: string) => {
    setPage(1);
    router.push({
      pathname: '/search',
      query: { q: query },
    });
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { posts, totalPages } = await getPublishedPosts(
        page,
        [],
        10,
        searchTerm
      );
      setPosts(posts);
      setTotalPages(totalPages);
    } catch (error) {
      setErrorMessage('Ошибка загрузки статей. Попробуйте позже.');
      console.log('Ошибка загрузки статей в поиске:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      fetchPosts();
    }
  }, [fetchPosts, searchTerm]);

  const pageTitle = searchTerm
    ? `Результаты поиска: ${searchTerm}`
    : 'Поиск статей';
  const pageDescription =
    'Поиск последних технических новостей и статей на ТехПульс. Найдите статьи по интересующим вас темам.';

  return (
    <>
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords="Технические новости, поиск статей, новинки технологий, последние разработки"
        url={`${NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        image={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
      />

      <div className={styles.newsPage}>
        <div className="content-container">
          <Breadcrumbs
            lastText={searchTerm ? `Поиск: ${searchTerm}` : 'Поиск'}
          />
          <SearchBar onSearch={handleSearch} initialQuery={searchTerm} />

          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <>
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
              {posts.length > 0 ? (
                <NewsList newsData={posts} />
              ) : searchTerm ? (
                <p>Нет статей по запросу «{searchTerm}»</p>
              ) : (
                <p>Введите поисковый запрос, чтобы найти статьи на сайте.</p>
              )}
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

export default SearchPage;
