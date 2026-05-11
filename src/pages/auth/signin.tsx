import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getProviders, signIn } from 'next-auth/react';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import type { BuiltInProviderType } from 'next-auth/providers/index';
import { useState } from 'react';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import routes from '@/config/routes';
import styles from '@/styles/SignInPage.module.scss';

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

interface SignInPageProps {
  providers: Providers;
}

const providerNames: Record<string, string> = {
  google: 'Google',
  vk: 'ВКонтакте',
  yandex: 'Яндекс',
};

const SignInPage = ({ providers }: SignInPageProps) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [isSocialAgreementAccepted, setIsSocialAgreementAccepted] =
    useState(false);

  const callbackUrl =
    typeof router.query.callbackUrl === 'string' ? router.query.callbackUrl : '/';

  const socialProviders = Object.values(providers || {}).filter(
    (provider) => provider.id !== 'credentials',
  );

  const handleCredentialsSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('Не удалось войти. Проверьте email и пароль.');
      return;
    }

    router.push(result?.url || callbackUrl);
  };

  const openSocialAgreement = (providerId: string) => {
    setSelectedProviderId(providerId);
    setIsSocialAgreementAccepted(false);
  };

  const closeSocialAgreement = () => {
    setSelectedProviderId('');
    setIsSocialAgreementAccepted(false);
  };

  const continueSocialSignIn = () => {
    if (!selectedProviderId || !isSocialAgreementAccepted) return;
    signIn(selectedProviderId, { callbackUrl });
  };

  const selectedProviderName =
    providerNames[selectedProviderId] || selectedProviderId;

  return (
    <>
      <Head>
        <title>Вход | TechPulse</title>
        <meta name="description" content="Вход в учетную запись TechPulse." />
      </Head>
      <main className={styles.signInPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Вход</h1>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <form className={styles.form} onSubmit={handleCredentialsSignIn}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          {socialProviders.length > 0 && (
            <>
              <div className={styles.divider}>или</div>
              <div className={styles.socialProviders}>
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    type="button"
                    variant="white"
                    className={styles.providerButton}
                    onClick={() => openSocialAgreement(provider.id)}
                  >
                    Войти через {providerNames[provider.id] || provider.name}
                  </Button>
                ))}
              </div>
            </>
          )}

          <p className={styles.registerLink}>
            Нет аккаунта? <Link href="/auth/register">Зарегистрироваться</Link>
          </p>
          <p className={styles.legalText}>
            При входе вы продолжаете использовать сайт на условиях{' '}
            <Link href={routes.userAgreement}>Пользовательского соглашения</Link>
            .
          </p>
        </div>
      </main>

      {selectedProviderId && (
        <div className={styles.modalOverlay} role="presentation">
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="social-agreement-title"
          >
            <h2 id="social-agreement-title">
              Вход через {selectedProviderName}
            </h2>
            <p>
              При входе через социальный сервис TechPulse получит данные
              профиля, необходимые для регистрации или авторизации: email, имя,
              фамилию, идентификатор профиля и аватар при наличии.
            </p>
            <label className={styles.agreement}>
              <input
                type="checkbox"
                checked={isSocialAgreementAccepted}
                onChange={(e) =>
                  setIsSocialAgreementAccepted(e.target.checked)
                }
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
            <div className={styles.modalActions}>
              <Button type="button" variant="white" onClick={closeSocialAgreement}>
                Отмена
              </Button>
              <Button
                type="button"
                disabled={!isSocialAgreementAccepted}
                onClick={continueSocialSignIn}
              >
                Продолжить
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default SignInPage;
