import Link from 'next/link';

import styles from './Source.module.scss';

interface SourceProps {
  source: { name: string; link: string };
}

export const Source: React.FC<SourceProps> = ({ source: { name, link } }) => {
  return (
    <Link
      className={styles.source}
      href={link}
      title={`Источник: ${name}`}
      aria-label={`Открыть источник ${name} в новом окне`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span aria-hidden="true"></span> {name}
    </Link>
  );
};
