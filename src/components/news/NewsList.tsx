import React from 'react';
import { IPost } from '@/types/post';
import { NewsItem } from './NewsItem';
import styles from './NewsList.module.scss';
import YandexAdBlock from '../reklama/YandexAdBlock';

const blockId = process.env.NEXT_PUBLIC_YANDEX_BLOCK_ID2 || '';

interface NewsListProps {
  newsData: IPost[];
}

export const NewsList: React.FC<NewsListProps> = ({ newsData }) => {
  return (
    <div className={styles.newsList}>
      {newsData.map((news, i) => (
        <React.Fragment key={news.id}>
          {i === 3 && <YandexAdBlock blockId={blockId} />}
          <NewsItem news={news} />
        </React.Fragment>
      ))}
    </div>
  );
};
