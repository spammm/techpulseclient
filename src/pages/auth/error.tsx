import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/shared/Button';

import styles from '@/styles/ErrorPage.module.scss';

const errorMessages: Record<string, string> = {
  CredentialsSignin: 'Неверный email или пароль.',
  UserNotFound: 'Пользователь не найден. Зарегистрируйтесь!',
  OAuthAccountNotLinked:
    'Этот email уже используется, но не привязан к соцсети. Пожалуйста, войдите с использованием email и пароля.',
};

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error) {
      setErrorMessage(
        errorMessages[error as string] ||
          'Произошла ошибка при входе. Попробуйте снова.'
      );
    }
  }, [error]);

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorTitle}>Ошибка входа</h1>
      <div className={styles.errorText}>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => signIn()}>Вернуться к входу</Button>
        <Button onClick={() => router.push('/auth/register')}>
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
