export type ScreenType =
  | 'feed'
  | 'search'
  | 'create'
  | 'detail'
  | 'my-profile'
  | 'user-profile'
  | 'settings'
  | 'login'
  | 'signup'
  | 'notifications'
  | 'edit-profile';

export type MainTabType = 'feed' | 'search' | 'my-profile' | 'settings';

export interface Author {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  badge?: string;
  isCertified?: boolean;
  level?: string;
}

export interface LinkPreview {
  title: string;
  url: string;
  status: string;
  ping: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    avatar: string;
    isAuthor?: boolean;
  };
  createdAt: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: Author;
  createdAt: string;
  category: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  commentsCount: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  linkPreview?: LinkPreview;
  tip?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  badgeTitle?: string;
  isCertified: boolean;
  level: string;
  bio: string;
  website?: string;
  postCount: number;
  likeCount: number;
  followerCount: number;
  isFollowing?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system' | 'mention';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  user?: {
    name: string;
    avatar: string;
    handle?: string;
  };
  postId?: string;
}
