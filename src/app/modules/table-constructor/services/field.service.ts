import { Injectable } from "@angular/core";
import { Field,FieldDto } from "../models/field";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';

@Injectable({
  providedIn: 'root'
})



export class FieldService { 
 fieldUrl = 'https://localhost:7094/Field';  // URL to web api 
 constructor(private http: HttpClient) { }


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
getFieldsByEntityId(id: string): Observable<FieldDto[]> {
  return this.http.get<FieldDto[]>(this.fieldUrl+'/GetByEntityId'+id);
}

getFieldsByProjectTypeId(id: string): Observable<FieldDto[]> {
  return this.http.get<FieldDto[]>(this.fieldUrl+'/GetByProjectTypeId'+id);
}
getFieldsByProjectId(id: string): Observable<FieldDto[]> {
  return this.http.get<FieldDto[]>(this.fieldUrl+'/GetByProjectId'+id);
}


getFields(): Observable<FieldDto[]> {
  return this.http.get<FieldDto[]>(this.fieldUrl);
}
insert(field: FieldDto): Observable<FieldDto> {
  field.id = GuidGenerator.newGuid();
  return this.http.post<FieldDto>(this.fieldUrl, field)
}

update(field: FieldDto): Observable<FieldDto> {
  return this.http.put<FieldDto>(this.fieldUrl, field)
}

remove(id: string): Observable<FieldDto> {
  var url = this.fieldUrl +'/' + id;
  return this.http.delete<FieldDto>(url);
}
getById(id: string): Observable<FieldDto>{
  var url = this.fieldUrl +'/' + id;
  return this.http.get<FieldDto>(url);
}
}