import { Injectable } from "@angular/core";
import { Entity,EntityDto } from "../models/entity";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';

@Injectable({
  providedIn: 'root'
})

export class EntityService { 
 entityUrl = 'https://localhost:7094/Entity';  // URL to web api 
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

getEntities(): Observable<EntityDto[]> {
  return this.http.get<EntityDto[]>(this.entityUrl);
}
insert(entity: EntityDto): Observable<EntityDto> {
  entity.id = GuidGenerator.newGuid();
  return this.http.post<EntityDto>(this.entityUrl, entity)
}

update(entity: EntityDto): Observable<EntityDto> {
  return this.http.put<EntityDto>(this.entityUrl, entity)
}

remove(id: string): Observable<EntityDto> {
  var url = this.entityUrl +'/' + id;
  return this.http.delete<EntityDto>(url);
}
getById(id: string): Observable<EntityDto>{
  var url = this.entityUrl +'/' + id;
  return this.http.get<EntityDto>(url);
}

}
