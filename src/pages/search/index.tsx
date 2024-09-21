import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NewsList } from '@/components/news';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPublishedPosts } from '../../api/postsApi';
import { IPost } from '@/types/post';
import { Pagination } from '@/components/pagination';
import { SearchBar } from '@/components/SearchBar';

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

  useEffect(() => {
    const fetchPosts = async () => {
      const { posts, totalPages } = await getPublishedPosts(
        page,
        [],
        10,
        searchTerm
      );
      setPosts(posts);
      setTotalPages(totalPages);
    };

    if (searchTerm) {
      fetchPosts();
    }
  }, [page, searchTerm]);

  const pageTitle = searchTerm
    ? `Результаты поиска: ${searchTerm}`
    : 'Поиск статей';
  const pageDescription =
    'Поиск последних технических новостей и статей на TechPulse. Найдите статьи по интересующим вас темам.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  };

  return (
    <>
      <Head>
        <title>{`${pageTitle} | ТехПульс`}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Технические новости, поиск статей, новинки технологий, последние разработки"
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className={styles.newsPage}>
        <div className="content-container">
          <Breadcrumbs
            lastText={searchTerm ? `Поиск: ${searchTerm}` : 'Поиск'}
          />

          <SearchBar onSearch={handleSearch} initialQuery={searchTerm} />

          {posts.length > 0 ? (
            <NewsList newsData={posts} />
          ) : (
            <p>Нет статей по запросу «{searchTerm}»</p>
          )}

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

export default SearchPage;
