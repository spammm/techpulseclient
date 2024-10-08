export interface IUser {
  id: number;
  username?: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  publicAlias?: string;
  note?: string;
  about?: string;
  avatar?: string;
  contacts?: { name: string; value: string }[];
  role?: 'admin' | 'writer' | 'manager' | 'client' | 'user';
  createdAt?: string;
  updatedAt?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}
