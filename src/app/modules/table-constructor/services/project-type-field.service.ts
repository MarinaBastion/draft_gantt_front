import { Injectable } from '@angular/core';
import { EntityField,EntityFieldDto } from "../models/entity_field";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';
import { ProjectTypeFieldsDto } from '../models/project-type-fields';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeFieldService {
  url = 'https://localhost:7094/ProjectTypeField';  // URL to web api 
  constructor(private http: HttpClient) { }
 
 
 getProjectTypeFields(): Observable<ProjectTypeFieldsDto[]> {
   return this.http.get<ProjectTypeFieldsDto[]>(this.url);
 }
 insert(prTypeField: ProjectTypeFieldsDto): Observable<ProjectTypeFieldsDto> {
   prTypeField.id = GuidGenerator.newGuid();
   return this.http.post<ProjectTypeFieldsDto>(this.url, prTypeField)
 }
 
 addBatch(prTypeField: ProjectTypeFieldsDto[]): Observable<boolean> {
   var payload = prTypeField.map(c => new ProjectTypeFieldsDto(c.id, c.project_type_id,c.field_id))
   return this.http.post<boolean>(this.url + '/batch', payload)
 }
 update(field: ProjectTypeFieldsDto): Observable<ProjectTypeFieldsDto> {
   return this.http.put<ProjectTypeFieldsDto>(this.url, field)
 }
 removeBatch(prTypeFields: ProjectTypeFieldsDto[]): Observable<boolean> {
   return this.http.put<boolean>(this.url + '/batch', prTypeFields)
 }
 remove(id: string): Observable<ProjectTypeFieldsDto> {
   var url = this.url +'/' + id;
   return this.http.delete<ProjectTypeFieldsDto>(url);
 }
 getById(id: string): Observable<ProjectTypeFieldsDto>{
   var url = this.url +'/' + id;
   return this.http.get<ProjectTypeFieldsDto>(url);
 }
}
