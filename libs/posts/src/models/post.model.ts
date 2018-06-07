import { ShortProfile } from "@sonder-workspace/profiles";

export interface Post {
  id: number;
  title: string;
  body: string;
  author: ShortProfile;
  points: number;
  voted: number;
  commentCount: number;
}
