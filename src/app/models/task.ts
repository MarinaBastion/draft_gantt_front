import { threadId } from "worker_threads";
import { Assignment, AssignmentDto,AssignViewModel } from "./assignment";
import {TaskValueView} from "../modules/table-constructor/models/task-value"

export class Task {
    constructor(id: string, 
        start_date: string,
        text: string,
        duration: number,
        progress: number,
        parent: string | null,
        open: boolean | null | undefined, 
        holder:string | null, 
        priority: string | null,
        user: Assignment[] | null | undefined,
        planned_start: string | null,
        planned_end: string | null,
        project_type_id: string | null,
        project_type_name: string | null
        ) {
        this.id = id,
        this.start_date = start_date,
        this.text = text,
        this.duration = duration,
        this.progress = progress,
        this.parent = parent,
        this.open = open,
        this.holder = holder,
        this.priority = priority,
        this.user =  user,
        this.planned_start = planned_start,
        this.planned_end = planned_end,
        this.project_type_id = project_type_id,
        this.project_type_name = project_type_name

      }
    id: string;
    start_date: string;
    text: string;
    duration: number;
    progress: number;
    parent: string | null;
    open: boolean | null | undefined; 
    holder:string | null;
    priority: string | null;
    user: Assignment[] | null | undefined;
    planned_start: string | null;
    planned_end: string | null;
    project_type_id: string | null;
    project_type_name: string | null;
}

export class TaskDto {
    constructor(id: string, 
        text: string,
        start_date:string,
        end_date: string | null,
        duration: number,
        progress : number,
        parent: string | null,
        type : string | null,
        planned_start: string | null,
        planned_end: string | null,
        user : AssignmentDto[] | null,
        project_type_id: string | null) {
        this.id = id,
        this.text = text,
        this.start_date = start_date,
        this.end_date = end_date,
        this.progress = progress,
        this.duration = duration,
        this.parent = parent,
        this.type = type,
        this.user = user,
        this.planned_start = planned_start,
        this.planned_end = planned_end,
        this.project_type_id = project_type_id
      }
      id: string; 
      text: string;
      start_date:string;
      end_date: string | null;
      duration: number;
      progress : number;
      parent: string | null;
      type: string | null;
      planned_start: string | null;
      planned_end: string | null;
      user: AssignmentDto[] | null;
      project_type_id: string | null;
}
export class TaskViewModel {
  constructor(id: string, 
      text: string,
      start_date:string,
      duration: number,
      progress : number,
      parent: string | null,
      type : string | null,
      open: boolean,
      user : AssignViewModel[] | null,
      holder: string | null,
      planned_start: string | null,
      planned_end: string | null,
      project_type_id: string | null,
      priority: string | null,
      values : TaskValueView[] | null){
      this.id = id,
      this.text = text,
      this.start_date = start_date,
      this.progress = progress,
      this.duration = duration,
      this.parent = parent,
      this.type = type,
      this.open = open,
      this.user = user,  
      this.holder =holder,
      this.priority = priority,
      this.planned_start = planned_start,
      this.planned_end = planned_end,
      this.project_type_id = project_type_id,
      this.values = values
    }
    id: string; 
    text: string;
    start_date:string;
    duration: number;
    progress : number;
    parent: string | null;
    type: string | null;
    open: boolean;
    planned_start: string | null;
    planned_end: string | null;
    user: AssignViewModel[] | null;
    holder: string | null;
    priority: string | null ;
    project_type_id: string | null;
    values : TaskValueView[] | null;
}
