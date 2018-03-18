export interface Task {
  id?: string;
  name?: string;
  idMember?: string[];
  description?: string;
  startDay?: Date;
  endDay?: Date;
  status?: boolean; // true: working, false: done
}
