import { ReactNode } from 'react';
import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  lastText: ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ lastText }) => {
  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
      <ul itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link href="/" itemProp="item">
            <span itemProp="name">Главная</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link href="/news" itemProp="item">
            <span itemProp="name">Новости</span>
          </Link>
          <meta itemProp="position" content="2" />
        </li>
        <li
          className={styles.lastText}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="name">{lastText}</span>
          <meta itemProp="position" content="3" />
        </li>
      </ul>
    </nav>
  );
};
