export interface Project {
    id?: string;
    name?: string;
    idMember?: string[];
    idTask?: string[];
    description?: string;
    startDay?: Date;
    endDay?: Date;
    status?: boolean; // true: working, false: done
    progress?: number;
    time?: number;
}
