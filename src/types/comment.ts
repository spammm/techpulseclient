import { IUser } from './user';
import { IPost } from './post';

export interface IComment {
  id: number;
  content: string;
  createdAt: string; 
  updatedAt: string; 
  published: boolean;
  user: Partial<IUser>; 
  post: Partial<IPost>; 
}
