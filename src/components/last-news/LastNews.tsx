import clsx from 'clsx';
import { IPost } from '@/types/post';
import { useEffect, useState } from 'react';
import { getPublishedPosts } from '@/api/postsApi';
import { NewsList } from '../news';
import styles from './LastNews.module.scss';

export const LastNews: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { posts } = await getPublishedPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);
  return (
    <section id="last_news" className={styles.news}>
      <div className={clsx(styles.news_container, 'content-container')}>
        <NewsList newsData={posts} />
      </div>
    </section>
  );
};
