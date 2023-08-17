import { Injectable } from '@angular/core';
import { TaskValueDto } from "../models/task-value";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';

@Injectable({
  providedIn: 'root'
})
export class TaskValueService {
  valueUrl = 'https://localhost:7094/TaskValue';  // URL to web api 
 constructor(private http: HttpClient) { }
 
  getTaskValues(): Observable<TaskValueDto[]> {
    return this.http.get<TaskValueDto[]>(this.valueUrl);
  }
  insert(taskValue: TaskValueDto): Observable<TaskValueDto> {
    taskValue.id = GuidGenerator.newGuid();
    return this.http.post<TaskValueDto>(this.valueUrl,taskValue)
  }

  update(taskValue: TaskValueDto): Observable<TaskValueDto> {
    return this.http.put<TaskValueDto>(this.valueUrl,taskValue)
  }

  remove(id: string): Observable<TaskValueDto> {
    var url = this.valueUrl +'/' + id;
    return this.http.delete<TaskValueDto>(url);
  }
  getById(id: string): Observable<TaskValueDto>{
    var url = this.valueUrl +'/' + id;
    return this.http.get<TaskValueDto>(url);
  }
  getByTaskId(id: string): Observable<TaskValueDto[]>{
    var url = this.valueUrl +'/byTask/' + id;
    return this.http.get<TaskValueDto[]>(url);   
  }
  addBatch(value: TaskValueDto[]): Observable<boolean> {
    debugger;
    return this.http.post<boolean>(this.valueUrl + '/batch', value)
  }
  deleteBatch(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.valueUrl + '/batch/' + id)
  }

}
