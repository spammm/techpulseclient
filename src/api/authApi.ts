import { getSession, signOut } from 'next-auth/react';
import api from './api';

interface RefreshToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export const refreshAccessToken = async (): Promise<RefreshToken> => {
  try {
    const session = await getSession();

    if (!session?.user.refreshToken) {
      throw new Error('No refresh token available!!!');
    }

    const response = await api.post('/auth/refresh-token', {
      refreshToken: session.user.refreshToken,
    });

    const { accessToken, refreshToken, accessTokenExpiresIn } = response.data;

    const newSession = {
      ...session,
      user: {
        ...session.user,
        accessToken,
        refreshToken,
        accessTokenExpires: Date.now() + accessTokenExpiresIn,
      },
    };

    console.log('pt:', session.user.accessToken);
    sessionStorage.setItem(
      'next-auth.session-token',
      JSON.stringify(newSession)
    );
    const ns = await getSession();
    console.log('at:', ns?.user.accessToken);
    return {
      accessToken,
      refreshToken,
      accessTokenExpires: Date.now() + accessTokenExpiresIn,
    };
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export const socialLogin = async (loginData: {
  email: string;
  name: string;
  provider: string;
  providerId: string;
}) => {
  try {
    const response = await api.post('/auth/social-login', loginData);
    return response.data;
  } catch {
    throw new Error('Social login failed');
  }
};

export const clientLogin = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post('/auth/login-client', loginData);
    return response.data;
  } catch {
    throw new Error('Login failed');
  }
};

export const clientRegister = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await api.post('/auth/register-client', {
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

class TokenExpiredError extends Error {
  email: string;

  constructor(message: string, email: string) {
    super(message);
    this.email = email;
    this.name = 'TokenExpiredError';
  }
}

export const confirmEmail = async (token: string) => {
  try {
    const response = await api.post('/auth/confirm-email', { token });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message === 'TokenExpiredError') {
      throw new TokenExpiredError(
        'TokenExpiredError',
        error.response.data.email
      );
    }
    throw new Error('Невалидный токен');
  }
};

export const resendConfirmationEmail = async (email: string) => {
  try {
    await api.post('/auth/resend-confirmation-email', { email });
  } catch {
    throw new Error('Ошибка при повторной отправке письма');
  }
};

export const logoutUser = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
