import Link from 'next/link';
import styles from './Tag.module.scss';

interface TagProps {
  tag: string;
  type?: 'linked' | 'small';
}

export const Tag: React.FC<TagProps> = ({ tag, type = 'linked' }) => {
  if (type === 'small') {
    return <span className={styles.smallTag}>{tag}</span>;
  }

  return (
    <Link
      href={{
        pathname: '/news',
        query: { tags: [tag] },
      }}
      className={styles.tag}
      title={`Открыть категорию ${tag}`}
    >
      <span>{tag}</span>
    </Link>
  );
};
