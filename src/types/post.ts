import { IPostImage } from './image';

export interface IPost {
  id: number;
  url: string;
  keywords?: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  image: IPostImage;
  imageLinks: { src: string; alt: string }[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sources: { name: string; link: string }[];
  authorName: string;
  showAuthorName: boolean;
  viewCount?: number;
}
