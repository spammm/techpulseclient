import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/shared/Button';

import styles from '@/styles/ErrorPage.module.scss';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('error: ', error);
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setErrorMessage('Неверный email или пароль.');
          break;
        case 'UserNotFound':
          setErrorMessage('Пользователь не найден. Зарегистрируйтесь!');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage(
            'Этот email уже используется, но не привязан к соцсети. Пожалуйста, войдите с использованием email и пароля.'
          );
          break;
        default:
          setErrorMessage('Произошла ошибка при входе. Попробуйте снова.');
          break;
      }
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
