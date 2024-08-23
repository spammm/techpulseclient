import axios from 'axios';
import { refreshAccessToken, logoutUser } from './authApi';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
export const api = axios.create({
  baseURL: API_SERVER,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
        //window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
