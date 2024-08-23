import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './NewsItem.module.scss';
import { Tag } from '../shared/Tag';
import { IPost } from '@/types/post';

interface NewsItemProps {
  news: IPost;
}

export const NewsItem: React.FC<NewsItemProps> = (props) => {
  const { image, publishedAt, title, subtitle, tags, url } = props.news;

  const timeAgo = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
    locale: ru,
  });

  return (
    <article className={styles.newsItem}>
      <div className={styles.imageContainer}>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            className={styles.image}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.timeAgo}>⌚ {timeAgo}</span>
        <h2 className={styles.title}>
          <Link href={`/news/${url}`}>{title}</Link>
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <ul className={styles.tags}>
          {tags.map((tag) => {
            return (
              <li key={tag} className={styles.tag}>
                <Tag tag={tag} />
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
