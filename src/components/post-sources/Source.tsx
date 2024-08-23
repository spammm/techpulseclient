import Link from 'next/link';
import styles from './Source.module.scss';

interface SourceProps {
  source: { name: string; link: string };
}

export const Source: React.FC<SourceProps> = ({ source: { name, link } }) => {
  return (
    <Link className={styles.source} href={link} title={name}>
      <span></span> {name}
    </Link>
  );
};
