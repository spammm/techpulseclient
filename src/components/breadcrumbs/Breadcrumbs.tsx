import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  lastText: ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ lastText }) => {
  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/news">Новости</Link>
        </li>
        <li className={styles.lastText}>
          <span>{lastText}</span>
        </li>
      </ul>
    </nav>
  );
};
