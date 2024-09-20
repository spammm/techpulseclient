import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import VKProvider from 'next-auth/providers/vk';
import YandexProvider, { YandexProfile } from 'next-auth/providers/yandex';
import CredentialsProvider from 'next-auth/providers/credentials';
import { socialLogin, clientLogin } from '@/api/authApi';
import { VKProfile } from '@/types/socialProviders';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresIn?: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (email && password) {
            const user = await clientLogin({
              email,
              password,
            });

            if (user) {
              return {
                id: user.id,
                firstName: user.firstName || user.email.split('@')[0],
                lastName: user.lastName || '',
                publicAlias: user.publicAlias || '',
                email: user.email,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                accessTokenExpires: Date.now() + user.accessTokenExpiresIn,
              };
            } else {
              throw new Error('UserNotFound');
            }
          } else {
            throw new Error('Поля Email и Password обязательные');
          }
        } catch (error) {
          if (error instanceof Error && error.message === 'UserNotFound') {
            throw new Error('UserNotFound');
          } else {
            throw new Error('Invalid credentials');
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    VKProvider({
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'email,profile',
        },
      },
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'login:email login:info',
        },
      },
      checks: ['state'],
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session, account, profile }) {
      if (trigger === 'update' && session) {
        token.firstName = session.firstName || token.firstName;
        token.lastName = session.lastName || token.lastName;
        token.publicAlias = session.publicAlias || token.publicAlias;
      }

      if (user) {
        token.id = user.id ? Number(user.id) : 0;
        token.email = user.email ?? 'unknown';
        token.firstName = user.firstName || user.email?.split('@')[0] || 'User';
        token.lastName = user.lastName || '';
        token.publicAlias = user.publicAlias || '';
        token.accessToken = user.accessToken ?? '';
        token.refreshToken = user.refreshToken ?? '';
        token.accessTokenExpires = user.accessTokenExpires ?? 0;
      }

      if (account && profile) {
        try {
          let avatar = '/avatar.webp';
          let firstName = '';
          let lastName = '';
          let email = '';

          if (account.provider === 'vk' && 'response' in profile) {
            const vkProfile = profile as VKProfile;
            firstName = vkProfile.response[0].first_name;
            lastName = vkProfile.response[0].last_name;
            avatar = vkProfile.response[0].photo_100;
            email = typeof account.email === 'string' ? account.email : '';
          }

          if (account.provider === 'google' && 'given_name' in profile) {
            const googleProfile = profile as GoogleProfile;
            firstName = googleProfile.given_name;
            lastName = googleProfile.family_name || '';
            avatar = googleProfile.picture;
            email = googleProfile.email || '';
          }

          if (account.provider === 'yandex' && 'first_name' in profile) {
            const yandexProfile = profile as YandexProfile;
            firstName =
              yandexProfile.first_name ||
              yandexProfile.real_name ||
              yandexProfile.display_name ||
              '';
            lastName = yandexProfile.last_name || '';
            avatar = '/avatar.webp';
            email =
              yandexProfile.default_email ||
              (Array.isArray(yandexProfile.emails)
                ? yandexProfile.emails[0]
                : '') ||
              '';
          }

          const loginData = {
            email: email || user?.email || '',
            name: firstName,
            lastName: lastName,
            provider: account.provider,
            providerId: account.providerAccountId,
            accessToken: account.access_token,
            avatar: avatar,
          };

          const tokens: Tokens = await socialLogin(loginData);

          const { accessToken, refreshToken, accessTokenExpiresIn } = tokens;

          const accessTokenExpires =
            accessTokenExpiresIn && Date.now() + accessTokenExpiresIn;

          token = {
            ...token,
            accessToken,
            refreshToken,
            accessTokenExpires,
            firstName,
            lastName,
            email,
            avatar,
          };
        } catch (error) {
          console.error('Error in JWT callback:', error);
        }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Если токен истек, обновляем его
      try {
        const response = await fetch(`${API_SERVER}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });
        const updatedTokens = await response.json();
        if (!updatedTokens?.accessToken || !updatedTokens?.refreshToken) {
          throw new Error('Invalid token response');
        }

        return {
          ...token,
          accessToken: updatedTokens.accessToken,
          refreshToken: updatedTokens.refreshToken,
          accessTokenExpires: Date.now() + updatedTokens.accessTokenExpiresIn,
        };
      } catch (error) {
        console.error('Error refreshing access token:', error);
        return token;
      }
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        firstName:
          typeof token.firstName === 'string' ? token.firstName : 'User',
        lastName: typeof token.lastName === 'string' ? token.lastName : '',
        publicAlias:
          typeof token.publicAlias === 'string' ? token.publicAlias : '',
        email: token.email || 'unknown',
        avatar: token.avatar || '/avatar.webp',
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
      };
      return session;
    },
  },

  pages: {
    error: '/auth/error', // Страница для показа ошибок
  },
};

export default NextAuth(authOptions);
