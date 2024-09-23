import Link from 'next/link';
import styles from './PostNavigation.module.scss';

interface PostNavigationProps {
  prevPostUrl?: string;
  nextPostUrl?: string;
}

export const PostNavigation: React.FC<PostNavigationProps> = ({
  prevPostUrl,
  nextPostUrl,
}) => {
  return (
    <nav className={styles.postNavigation} aria-label="Навигация по статьям">
      {prevPostUrl && (
        <Link href={prevPostUrl} className={styles.prevPost}>
          Предыдущая новость
        </Link>
      )}
      {nextPostUrl && (
        <Link href={nextPostUrl} className={styles.nextPost}>
          Следующая новость
        </Link>
      )}
    </nav>
  );
};
