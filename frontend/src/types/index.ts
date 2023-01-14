export interface Board {
  to: string;
  from: string;
  title: string;
  author: string;
  template: string;
  imageURL: string;
  isPublished: boolean;
  posts?: Record<string, Post>;
}

export interface Post {
  from: string;
  message: string;
  imageURL: string;
  avatarURL: string;
}

export interface Template {
  background: string;
  description: string;
  isPublished: boolean;
  title: string;
}
