import { Person } from "./person.model";

export interface Sub {
  id: number;
  size: number;
  name: string;
  members: Array<Person>;
}
