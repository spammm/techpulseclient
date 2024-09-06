import { IPost } from '@/types/post';
import api from './api';

export const getPublishedPosts = async (
  page: number = 1,
  tags: string[] = [],
  search: string = '',
  limit: number = 10
): Promise<{ posts: IPost[]; totalPages: number }> => {
  const response = await api.get('/posts/published', {
    params: { page, tags, limit, search },
  });
  return response.data;
};

export const getPopularPosts = async (): Promise<IPost[]> => {
  const response = await api.get('/posts/popular');
  return response.data;
};

export const getPostByUrl = async (url: string): Promise<IPost> => {
  const response = await api.get(`/posts/url/${url}`);
  return response.data;
};

export const getAdjacentPosts = async (
  currentPostId: number
): Promise<{ prevPostUrl?: string; nextPostUrl?: string }> => {
  const response = await api.get(`/posts/adjacent/${currentPostId}`);
  return response.data;
};

export const incrementViewCount = async (postId: number) => {
  try {
    await api.patch(`/posts/increment-view/${postId}`);
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};
