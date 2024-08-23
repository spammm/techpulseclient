import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { getPopularPosts } from '@/api/postsApi';
import { IPost } from '@/types/post';
import styles from './Popular.module.scss';

export const Popular: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const posts = await getPopularPosts();
        setPopularPosts(posts);
      } catch (error) {
        console.error('Ошибка при загрузке популярных новостей:', error);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <section
      className={styles.popularNews}
      aria-labelledby="popular-news-title"
    >
      <div className={clsx(styles.popularWrapper, 'content-container')}>
        <div className={styles.imageContainer}>
          <picture>
            <source srcSet="/img/mostPopular.webp" type="image/webp" />
            <source srcSet="/img/mostPopular.jpg" type="image/jpeg" />
            <Image
              src="/img/mostPopular.jpg"
              alt="Логотип популярной новости"
              className={styles.image}
              width={773}
              height={550}
              loading="lazy"
            />
          </picture>
        </div>
        <div className={styles.content}>
          <h2 id="popular-news-title" className={styles.title}>
            Популярные новости
          </h2>
          <ul className={styles.newsList}>
            {popularPosts.map((post) => (
              <li key={post.id} className={styles.newsItem}>
                <Link href={`/news/${post.url}`} className={styles.newsLink}>
                  <h3 className={styles.newsTitle}>{post.title}</h3>
                  <p className={styles.newsDescription}>{post.subtitle}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
