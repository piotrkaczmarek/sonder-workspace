import { Person } from "./person.model";

export interface Party {
  id: number;
  size: number;
  name: string;
  members: Array<Person>;
}
