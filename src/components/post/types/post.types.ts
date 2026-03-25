export interface IComment {
  id: string | number;
  authorId?: number;
  text: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  rating?: number;
}
