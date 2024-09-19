import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.footer__content, 'content-container')}>
        <p>© {currentYear} TechPulse</p>
        <p>
          Contact us: <a href="mailto:info@techpulse.com">info@techpulse.com</a>
        </p>
        <div className={styles.footer__socials}>
          <Link
            href="https://t.me/tekhulse"
            target="_blank"
            className={styles.footer__socialLink}
            aria-label="Telegram (открывается в новом окне)"
            rel="noopener noreferrer"
          >
            Telegram
          </Link>
          {/* <Link
            href="https://vk.com/techpulse"
            target="_blank"
            className={styles.footer__socialLink}
            aria-label="ВКонтакте (открывается в новом окне)"
            rel="noopener noreferrer"
          >
            ВКонтакте
          </Link> */}
        </div>
      </div>
    </footer>
  );
};
