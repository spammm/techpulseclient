import Link from 'next/link';
import clsx from 'clsx';

import routes from '@/config/routes';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.footer__content, 'content-container')}>
        <p>© {currentYear} TechPulse</p>
        <p>
          Связаться с нами: <a href="mailto:info@tehpulse.ru">info@tehpulse.ru</a>
        </p>
        <nav className={styles.footer__legal} aria-label="Правовая информация">
          <Link href={routes.userAgreement}>Пользовательское соглашение</Link>
          <Link href={routes.privacy}>Политика персональных данных</Link>
          <Link href={routes.personalDataConsent}>Согласие на обработку ПД</Link>
          <Link href={routes.cookies}>Политика cookie</Link>
        </nav>
      </div>
    </footer>
  );
};
