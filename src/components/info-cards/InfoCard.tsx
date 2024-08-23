import Link from 'next/link';
import Image from 'next/image';
import styles from './InfoCard.module.scss';

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageUrl,
  tags = [],
}) => {
  const tagsQuery = tags.join(',');

  return (
    <article className={styles.card}>
      <Link
        href={{
          pathname: '/news',
          query: { tags: tagsQuery },
        }}
        className={styles.cardLink}
        aria-label={`${title} - ${description}`}
      >
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={title}
            className={styles.cardImage}
            width={224}
            height={176}
            sizes="(max-width: 640px) 1180px, 787px"
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </Link>
    </article>
  );
};
