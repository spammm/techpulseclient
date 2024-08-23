export interface IComment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
