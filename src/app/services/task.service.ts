import { Injectable } from "@angular/core";
import { TaskDto, Task, TaskViewModel } from "../models/task";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../utils/UidGenerator';
import {HandleError} from './task-helper';
import { AssignmentDto } from "../models/assignment";



@Injectable({
  providedIn: 'root'
})
export class TaskService { 
 taskUrl = 'https://localhost:7094/Task';  // URL to web api 
 constructor(private http: HttpClient) { }

 getTasks(): Observable<TaskViewModel[]> {
  return this.http.get<TaskViewModel[]>(this.taskUrl);
}

private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}


insert(task: TaskDto): Observable<TaskViewModel> {
  var par: string | null;
  if (task.parent == '0') { par = null}
  else par = task.parent;
  var assigns: AssignmentDto[];
  task.id = GuidGenerator.newGuid();
  if (task.user != null)
  {
    assigns = task.user
  
    for (var index in assigns) {
      console.log(index); // prints indexes: 0, 1, 2, 3
      console.log(assigns[index]); // prints elements: 10, 20, 30, 40
      if ( !GuidGenerator.isUUID(assigns[index].id))
        assigns[index].id = GuidGenerator.newGuid();

      assigns[index].task_id = task.id;
    }
    task.user = assigns;
  }
  var planned_end: string | null; 
  if ( task.planned_end === undefined || task.planned_end === null ) 
    planned_end = "";
  else 
    planned_end = task.planned_end;
  var planned_start: string | null; 
  if ( task.planned_start === undefined || task.planned_start === null ) 
    planned_start = "";
  else 
    planned_start = task.planned_start;
  var task1: TaskDto = new TaskDto(task.id, task.text,task.start_date,task.end_date,task.duration,task.progress,par,task.type,planned_start,planned_end, task.user,task.project_type_id);
  return this.http.post<TaskViewModel>(this.taskUrl, task1)
}

update(task: any): Observable<TaskViewModel> {
  var par: string | null;
  if (task.parent == '0' ) { par = null}
  else par = task.parent;
  var assigns: AssignmentDto[];
  if (task.user != null)
  {
    assigns = task.user
  
    for (var index in assigns) {
      console.log(index); // prints indexes: 0, 1, 2, 3
      console.log(assigns[index]); // prints elements: 10, 20, 30, 40
      if ( !GuidGenerator.isUUID(assigns[index].id))
        assigns[index].id = GuidGenerator.newGuid();
      assigns[index].task_id = task.id;
    }
    task.user = assigns;
    
}
var planned_end: string | null; 
  if ( task.planned_end === undefined || task.planned_end === null ) 
    planned_end = "";
  else 
    planned_end = task.planned_end;
  var planned_start: string | null; 
  if ( task.planned_start === undefined || task.planned_start === null ) 
    planned_start = "";
  else 
    planned_start = task.planned_start;
  var task1: TaskDto = new TaskDto(task.id, task.text,task.start_date,task.end_date,task.duration,task.progress,par,task.type,planned_start,planned_end,task.user,task.projectType);

  return this.http.put<TaskViewModel>(this.taskUrl, task1);

}

remove(id: string): Observable<TaskDto> {
  var url = this.taskUrl +'/' + id;
  return this.http.delete<TaskDto>(url);
}
getByProjectId(id: string): Observable<TaskViewModel[]>{
  var url = this.taskUrl +'/projects/' + id;
  return this.http.get<TaskViewModel[]>(url);
}
getTasksByProjectIdWithFields(id: string) : Observable<TaskViewModel[]>{
  var url = this.taskUrl +'/projectswithFields/' + id;
  return this.http.get<TaskViewModel[]>(url);
}
getOnlyProjects(): Observable<TaskViewModel[]>{
  var url = this.taskUrl +'/projects' ;
  return this.http.get<TaskViewModel[]>(url);
}
}
