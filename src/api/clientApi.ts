import { IUser } from '@/types/user';
import api from './api';

export const registerClient = async (
  registerData: Partial<IUser>
): Promise<IUser> => {
  const response = await api.post('/auth/register', registerData);
  return response.data;
};

export const loginClient = async (
  username: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const updateClientProfile = async (
  userId: string,
  profileData: Partial<IUser>
): Promise<IUser> => {
  const response = await api.put(`/users/${userId}`, profileData);
  return response.data;
};
