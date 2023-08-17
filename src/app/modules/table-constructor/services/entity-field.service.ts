import { Injectable } from "@angular/core";
import { EntityField,EntityFieldDto } from "../models/entity_field";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';

@Injectable({
  providedIn: 'root'
})
export class EntityFieldService {
 fieldUrl = 'https://localhost:7094/EntityField';  // URL to web api 
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

getEntityFields(): Observable<EntityFieldDto[]> {
  return this.http.get<EntityFieldDto[]>(this.fieldUrl);
}
insert(entField: EntityFieldDto): Observable<EntityFieldDto> {
  entField.id = GuidGenerator.newGuid();
  return this.http.post<EntityFieldDto>(this.fieldUrl, entField)
}

addBatch(entFields: EntityFieldDto[]): Observable<boolean> {
  var payload = entFields.map(c => new EntityFieldDto(c.id,c.entity_id,c.field_id))
  return this.http.post<boolean>(this.fieldUrl + '/batch', payload)
}
update(field: EntityFieldDto): Observable<EntityFieldDto> {
  return this.http.put<EntityFieldDto>(this.fieldUrl, field)
}
removeBatch(entFields: EntityFieldDto[]): Observable<boolean> {
  return this.http.put<boolean>(this.fieldUrl + '/batch', entFields)
}
remove(id: string): Observable<EntityFieldDto> {
  var url = this.fieldUrl +'/' + id;
  return this.http.delete<EntityFieldDto>(url);
}
getById(id: string): Observable<EntityFieldDto>{
  var url = this.fieldUrl +'/' + id;
  return this.http.get<EntityFieldDto>(url);
}
}