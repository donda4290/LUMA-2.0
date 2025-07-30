export interface Author {
  username: string;
  displayName: string;
  avatar?: string;
}

export interface PostContent {
  type: 'image' | 'text' | 'quote';
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

export interface Post {
  id: string;
  author: Author;
  content: PostContent;
  stats: PostStats;
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  postCount: number;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Comment {
  id: string;
  author: Author;
  text: string;
  timestamp: string;
  likes: number;
} 