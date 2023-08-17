import { Injectable } from "@angular/core";
import { Value,ValueDto } from "../models/value";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../../../utils/UidGenerator';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

 valueUrl = 'https://localhost:7094/Value';  // URL to web api 
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

  getEntities(): Observable<ValueDto[]> {
    return this.http.get<ValueDto[]>(this.valueUrl);
  }
  insert(entity: ValueDto): Observable<ValueDto> {
    entity.id = GuidGenerator.newGuid();
    return this.http.post<ValueDto>(this.valueUrl, entity)
  }

  update(entity: ValueDto): Observable<ValueDto> {
    return this.http.put<ValueDto>(this.valueUrl, entity)
  }

  remove(id: string): Observable<ValueDto> {
    var url = this.valueUrl +'/' + id;
    return this.http.delete<ValueDto>(url);
  }
  getById(id: string): Observable<ValueDto>{
    var url = this.valueUrl +'/' + id;
    return this.http.get<ValueDto>(url);
  }
  getByInstanceId(id: string): Observable<ValueDto[]>{
    var url = this.valueUrl +'/byInstance/' + id;
    return this.http.get<ValueDto[]>(url);   
  }

  getWithChildById(id: string): Observable<ValueDto[]>{
    var url = this.valueUrl +'/childvalues/' + id;
    return this.http.get<ValueDto[]>(url);
  }

  addBatch(value: ValueDto[]): Observable<boolean> {
    return this.http.post<boolean>(this.valueUrl + '/batch', value)
  }
  deleteBatch(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.valueUrl + '/batch/' + id)
  }

}

