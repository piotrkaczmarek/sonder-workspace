export interface Comment {
  id: number;
  body: string;
  authorId: number;
  parentIds: Array<number>;
  points: number;
  voted: number;
}
