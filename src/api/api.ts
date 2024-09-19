import axios from 'axios';
import { getSession } from 'next-auth/react';
import { refreshAccessToken, logoutUser } from './authApi';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export const api = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const session = await getSession();
    
    if (error.response?.status === 401 && !originalRequest._retry && session) {
      originalRequest._retry = true;
      try {
        const { accessToken: newToken } = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        await logoutUser();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
