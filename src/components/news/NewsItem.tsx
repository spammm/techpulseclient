import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Tag } from '../shared/Tag';
import { IPost } from '@/types/post';

import styles from './NewsItem.module.scss';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface NewsItemProps {
  news: IPost;
}

export const NewsItem: React.FC<NewsItemProps> = (props) => {
  const { image, publishedAt, title, subtitle, tags, url, authorName } =
    props.news;

  const timeAgo = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
    locale: ru,
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: image?.src || `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${url}`,
    datePublished: new Date(publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: authorName || 'John Doe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Техпульс',
      logo: {
        '@type': 'ImageObject',
        url: `${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`,
      },
    },
    description: subtitle,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/news/${url}`,
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <article className={styles.newsItem}>
        <div className={styles.imageContainer}>
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              className={styles.image}
              loading="lazy"
              width={image?.width || 640}
              height={image?.height || 480}
              quality={70}
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
                <li key={tag + url} className={styles.tag}>
                  <Tag tag={tag} />
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </>
  );
};
