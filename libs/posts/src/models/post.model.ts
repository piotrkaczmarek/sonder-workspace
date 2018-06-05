export interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  points: number;
  voted: number;
  commentCount: number;
}
