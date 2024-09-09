export interface IPost {
  id: number;
  url: string;
  keywords?: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
    source?: string;
    sourceUrl?: string;
    width?: number;
    hight?: number;
  };
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
