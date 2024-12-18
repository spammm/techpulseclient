import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '../shared/Button';
import { AuthButton } from '../auth-button/AuthButton';
import routes from '@/config/routes';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav
        className={clsx(styles.header__nav, 'content-container')}
        aria-label="Main Navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <Link
          className={styles.logo}
          href={routes.home}
          title="Переход на главную страницу"
        >
          <Image
            src="/svg/logo-icon-only.svg"
            width={28}
            height={28}
            alt="Логотип TechPulse"
          />
          <span>TechPulse</span>
        </Link>
        <Button
          variant="menu"
          onClick={toggleMenu}
          className={styles.header__menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          aria-label="Toggle Menu"
        />
        <ul
          id="main-menu"
          className={clsx(styles.header__links, {
            [styles.header__links_hidden]: !isMenuOpen,
          })}
          role="menu"
        >
          <li role="none">
            <Link
              href={routes.news}
              className={styles.header__link}
              role="menuitem"
              itemProp="url"
            >
              <span itemProp="name">Новости</span>
            </Link>
          </li>
          <li role="none">
            <Link
              href={routes.search}
              className={styles.header__link}
              role="menuitem"
              itemProp="url"
            >
              <span itemProp="name">Поиск по сайту</span>
            </Link>
          </li>
          <li role="none">
            <Link
              href={routes.about}
              className={styles.header__link}
              role="menuitem"
              itemProp="url"
            >
              <span itemProp="name">О проекте</span>
            </Link>
          </li>
          <li role="none">
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
