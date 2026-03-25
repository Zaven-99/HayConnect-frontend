export interface UserResponseDto {
  id: number;
  name: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface CommentDto {
  id: number;
  text: string;
  rating: number;
  postId: number;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
}

export interface CreatePostForm {
  id: string;
  text: string;
  images?: string[];
  author?: UserResponseDto;
  ratingAvg?: number;
  createdAt: string;
  rating?: number;
  comments: CommentDto[];
}
