import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>('en');

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }

    const browserLanguage = navigator.language || navigator.languages[0];
    if (browserLanguage.startsWith('ru')) {
      setLanguage('ru');
    } else {
      setLanguage('en');
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  return (
    visible && (
      <div className={styles.cookieConsent}>
        <div className={styles.cookieContent}>
          <p>
            {language === 'ru'
              ? 'Мы используем файлы cookie, чтобы обеспечить вам лучший опыт на нашем сайте.'
              : 'We use cookies to ensure you get the best experience on our website.'}
          </p>
          <button className={styles.acceptButton} onClick={acceptCookies}>
            {language === 'ru' ? 'Принять' : 'Accept'}
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
