import { IUser } from '@/types/user';
import api from './api';

export const updateClientProfile = async (
  userId: number,
  profileData: Partial<IUser>
): Promise<IUser> => {
  const response = await api.patch(`/users/${userId}`, profileData);
  return response.data;
};
