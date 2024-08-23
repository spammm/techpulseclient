import { IComment } from '@/types/comment';
import api from './api';

export const getCommentsForPost = async (
  postId: number
): Promise<IComment[]> => {
  const response = await api.get(`/comments/post/${postId}`);
  return response.data;
};

export const addCommentToPost = async (
  postId: number,
  commentData: Partial<IComment>
): Promise<IComment> => {
  const response = await api.post(`/comments`, {
    postId,
    ...commentData,
  });
  return response.data;
};
