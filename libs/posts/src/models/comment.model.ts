import { Profile } from "@sonder-workspace/profiles";

export interface Comment {
  id: number;
  body: string;
  author: Profile;
  parentIds: Array<number>;
  points: number;
  voted: number;
}
