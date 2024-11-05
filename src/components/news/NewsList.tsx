import React from 'react';
import Head from 'next/head';
import { IPost } from '@/types/post';
import { NewsItem } from './NewsItem';
import { YandexAdBlock } from '../shared/YandexAdBlock';
import routes from '@/config/routes';
import styles from './NewsList.module.scss';

const blockId = process.env.NEXT_PUBLIC_YANDEX_BLOCK_ID2 || '';

interface NewsListProps {
  newsData: IPost[];
}

export const NewsList: React.FC<NewsListProps> = ({ newsData }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: newsData.map((news, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${routes.news}/${news.url}`,
    })),
  };
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className={styles.newsList}>
        {newsData.map((news, i) => (
          <React.Fragment key={news.id}>
            {i === 3 && <YandexAdBlock blockId={blockId} key={news.url} />}
            <NewsItem news={news} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
