import { Profile } from "@sonder-workspace/profiles";
import { Group } from "@sonder-workspace/groups"

export interface Post {
  id: number;
  title: string;
  body: string;
  author: Profile;
  points: number;
  voted: number;
  group: Group;
  commentCount: number;
}
