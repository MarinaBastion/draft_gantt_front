import { Injectable } from '@angular/core';
import { ErrorDialogServiceService } from  './error-dialog-service.service';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { ErrorModel } from '../interfaces/error/error';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogServiceService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
  return next.handle(request).pipe(
  catchError((error: HttpErrorResponse) => {
  let data: ErrorModel= {reason: "", status : 0};
  data = {
    reason: error && error.error ? error.error: '',
    status: error.status
  };
  this.errorDialogService.openDialog(data);
  return throwError(() => new Error(error.message));
  }));
  }
}