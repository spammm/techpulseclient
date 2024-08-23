import { IPost } from '@/types/post';
import { NewsItem } from './NewsItem';
import styles from './NewsList.module.scss';

interface NewsListProps {
  newsData: IPost[];
}

export const NewsList: React.FC<NewsListProps> = ({ newsData }) => {
  return (
    <div className={styles.newsList}>
      {newsData.map((news, index) => (
        <NewsItem key={index} news={news} />
      ))}
    </div>
  );
};
