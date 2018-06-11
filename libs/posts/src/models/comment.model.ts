import { ShortProfile } from "@sonder-workspace/profiles";

export interface Comment {
  id: number;
  body: string;
  author: ShortProfile;
  parentIds: Array<number>;
  points: number;
  voted: number;
}
