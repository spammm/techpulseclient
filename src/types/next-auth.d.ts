import NextAuth from 'next-auth';
import { IUser } from './user';

declare module 'next-auth' {
  interface Session {
    user: Partial<IUser>;
  }

  interface User extends Omit<IUser, 'password'> {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    firstName: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
