export interface Comment {
  id: number;
  body: string;
  authorId: number;
  parentCommentIds: Array<number>;
}
