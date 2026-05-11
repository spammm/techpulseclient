import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { clientRegister } from '@/api/authApi';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import routes from '@/config/routes';

import styles from '@/styles/RegisterPage.module.scss';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return 'Email и пароль обязательны.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Введите корректный email.';
    }
    if (password.length < 6) {
      return 'Пароль должен содержать минимум 6 символов.';
    }
    if (!isAgreementAccepted) {
      return 'Необходимо согласиться с пользовательским соглашением и обработкой персональных данных.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await clientRegister(formData);
      setSuccessMessage(
        'Регистрация прошла успешно! Пожалуйста, перейдите в свою почту и подтвердите email.'
      );
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Ошибка при регистрации.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className={clsx(styles.registerPage, 'content-container')}>
      <h1>Регистрация</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {successMessage ? (
        <p className={styles.successMessage}>{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label className={styles.agreement}>
            <input
              type="checkbox"
              checked={isAgreementAccepted}
              onChange={(e) => setIsAgreementAccepted(e.target.checked)}
            />
            <span>
              Я соглашаюсь с{' '}
              <Link href={routes.userAgreement}>
                Пользовательским соглашением
              </Link>{' '}
              и{' '}
              <Link href={routes.personalDataConsent}>
                обработкой персональных данных
              </Link>
              .
            </span>
          </label>
          <Button type="submit" disabled={isLoading || !isAgreementAccepted}>
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
