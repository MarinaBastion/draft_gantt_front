import { Injectable } from '@angular/core';
import { Instance,InstanceDto } from "../models/instance";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';

@Injectable({
  providedIn: 'root'
})
export class InstanceService { 
 fieldUrl = 'https://localhost:7094/Instance';
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
getInstancesByEntityId(id: string): Observable<InstanceDto[]> {
  return this.http.get<InstanceDto[]>(this.fieldUrl+'/GetInstancesByEntity'+id);
}


getInstances(): Observable<InstanceDto[]> {
  return this.http.get<InstanceDto[]>(this.fieldUrl);
}
insert(field: InstanceDto): Observable<InstanceDto> {
  field.id = GuidGenerator.newGuid();
  return this.http.post<InstanceDto>(this.fieldUrl, field)
}

update(instance: InstanceDto): Observable<InstanceDto> {
  return this.http.put<InstanceDto>(this.fieldUrl, instance)
}

remove(id: string): Observable<InstanceDto> {
  var url = this.fieldUrl +'/' + id;
  return this.http.delete<InstanceDto>(url);
}
getById(id: string): Observable<InstanceDto>{
  var url = this.fieldUrl +'/' + id;
  return this.http.get<InstanceDto>(url);
}
}