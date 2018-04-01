import { Person } from "./person.model";

export interface Group {
  id: number;
  size: number;
  name: string;
  members: Array<Person>;
}
