import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '../shared/Button';
import { AuthButton } from '../auth-button/AuthButton';

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
          href="/"
          title="Переход на главную страницу"
        >
          <Image
            src="/img/logo_white.svg"
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
        <div
          id="main-menu"
          className={clsx(styles.header__links, {
            [styles.header__links_hidden]: !isMenuOpen,
          })}
          role="menu"
        >
          <Link
            href="/news"
            className={styles.header__link}
            role="menuitem"
            itemProp="url"
          >
            <span itemProp="name">Новости</span>
          </Link>
          <Link
            href="/search"
            className={styles.header__link}
            role="menuitem"
            itemProp="url"
          >
            <span itemProp="name">Поиск по сайту</span>
          </Link>
          <Link
            href="/about"
            className={styles.header__link}
            role="menuitem"
            itemProp="url"
          >
            <span itemProp="name">О проекте</span>
          </Link>
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
