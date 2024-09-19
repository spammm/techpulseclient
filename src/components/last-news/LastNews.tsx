import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { IPost } from '@/types/post';
import { getPublishedPosts } from '@/api/postsApi';
import { NewsList } from '../news';

import styles from './LastNews.module.scss';

export const LastNews: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const pathname = usePathname();
  const currentPostUrl = pathname ? pathname.split('/').at(-1) : null;
  useEffect(() => {
    const fetchPosts = async () => {
      const { posts } = await getPublishedPosts();
      setPosts(posts.filter((post) => post.url !== currentPostUrl));
    };
    fetchPosts();
  }, [currentPostUrl]);
  return (
    <section id="last_news" className={styles.news}>
      <div className={clsx(styles.news_container, 'content-container')}>
        <NewsList newsData={posts} />
      </div>
    </section>
  );
};

export default LastNews;
