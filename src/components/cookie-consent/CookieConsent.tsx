import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';
import {
  getCookieConsentStatus,
  rejectCookieConsent,
  saveCookieConsent,
} from './consentStorage';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsentStatus()) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    saveCookieConsent();
    setVisible(false);
  };

  const rejectCookies = () => {
    rejectCookieConsent();
    setVisible(false);
  };

  return (
    visible && (
      <div className={styles.cookieConsent}>
        <div className={styles.cookieContent}>
          <p>
            Мы используем необходимые cookie для работы сайта, а с вашего
            согласия — аналитические, рекламные и функциональные cookie.
            Нажимая «Согласен», вы даёте согласие на обработку пользовательских
            данных на условиях{' '}
            <Link href="/privacy" className={styles.cookieLink}>
              политики обработки персональных данных
            </Link>{' '}
            и{' '}
            <Link href="/cookies" className={styles.cookieLink}>
              политики cookie
            </Link>
            .
          </p>
          <div className={styles.actions}>
            <button className={styles.rejectButton} onClick={rejectCookies}>
              Отказаться
            </button>
            <button className={styles.acceptButton} onClick={acceptCookies}>
              Согласен
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
