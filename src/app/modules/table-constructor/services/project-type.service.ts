import { Injectable } from '@angular/core';
import { EntityField,EntityFieldDto } from "../models/entity_field";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';
import { ProjectTypeDto } from '../models/project-type';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {
  projectTypeUrl = 'https://localhost:7094/ProjectType';  // URL to web api 
constructor(private http: HttpClient) { }


getProjectTypes(): Observable<ProjectTypeDto[]> {
 return this.http.get<ProjectTypeDto[]>(this.projectTypeUrl);
}
insert(projType: ProjectTypeDto): Observable<ProjectTypeDto> {
  projType.id = GuidGenerator.newGuid();
 return this.http.post<ProjectTypeDto>(this.projectTypeUrl, projType)
}

update(projType: ProjectTypeDto): Observable<ProjectTypeDto> {
 return this.http.put<ProjectTypeDto>(this.projectTypeUrl, projType)
}

remove(id: string): Observable<ProjectTypeDto> {
 var url = this.projectTypeUrl +'/' + id;
 return this.http.delete<ProjectTypeDto>(url);
}
getById(id: string): Observable<ProjectTypeDto>{
 var url = this.projectTypeUrl +'/' + id;
 return this.http.get<ProjectTypeDto>(url);
}
}


