import { Profile } from "@sonder-workspace/profiles";

export interface Group {
  id: number;
  name: string;
}

export interface GroupFull extends Group {
  size: number;
  members: Array<Profile>;
}
