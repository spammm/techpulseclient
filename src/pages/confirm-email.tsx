import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmEmail, resendConfirmationEmail } from '@/api/authApi';
import { Button } from '@/components/shared/Button';

import styles from '../styles/ConfirmEmailPage.module.scss';

const ConfirmEmailPage = () => {
  const [status, setStatus] = useState<
    'success' | 'error' | 'expired' | 'loading'
  >('loading');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disableResendButton, setDisableResendButton] =
    useState<boolean>(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null); // Для отображения сообщения о повторной отправке
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return; // Ждем, пока маршрутизатор будет готов

    const { token } = router.query;
    if (token) {
      setDisableResendButton(true);
      confirmEmail(token as string)
        .then(() => setStatus('success'))
        .catch((error) => {
          if (error.message === 'TokenExpiredError') {
            setStatus('expired');
            setEmail(error.email); // Сохраняем email для повторной отправки
          } else {
            setStatus('error');
            setErrorMessage(
              error.message || 'Произошла ошибка при подтверждении.'
            );
          }
        })
        .finally(() => {
          setDisableResendButton(false);
        });
    }
  }, [router.isReady, router.query]);

  const handleResendConfirmation = () => {
    if (email) {
      setDisableResendButton(true);
      resendConfirmationEmail(email)
        .then(() => {
          setResendStatus('Повторное письмо отправлено. Проверьте вашу почту.');
        })
        .catch(() => {
          setResendStatus('Ошибка при повторной отправке письма.');
        })
        .finally(() => {
          setDisableResendButton(false);
        });
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (status === 'success') {
    return (
      <div className={styles.container}>
        <h1>Ваш email успешно подтвержден!</h1>
        <p>Теперь вы можете войти в свой аккаунт.</p>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className={styles.container}>
        <h1>Срок действия ссылки истек</h1>
        <p>
          Пожалуйста, запросите новое письмо для подтверждения вашего email.
        </p>
        {!resendStatus && (
          <Button
            onClick={handleResendConfirmation}
            disabled={disableResendButton}
          >
            Повторно отправить письмо
          </Button>
        )}
        {resendStatus && <p className={styles.resendStatus}>{resendStatus}</p>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Ошибка</h1>
      <p>{errorMessage || 'Невалидная ссылка для подтверждения.'}</p>
    </div>
  );
};

export default ConfirmEmailPage;
