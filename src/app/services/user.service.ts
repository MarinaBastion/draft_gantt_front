import { Injectable } from '@angular/core';
import { User} from "../models/user";
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../utils/UidGenerator';
import {HandleError} from './task-helper'; 
import {RegistrationResponseDto} from '../interfaces/responseDto';
import {UserForRegistrationDto} from '../interfaces/userRegistrationDto';
import { LoginModel,AuthenticatedResponse } from '../models/login.model';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'https://localhost:7094/ApplicationUser';  // URL to web api 
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  registerUser(user: UserForRegistrationDto): Observable<RegistrationResponseDto> {
    return this.http.post<RegistrationResponseDto>(this.userUrl, user)
  }
  loginUser(login: LoginModel): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(this.userUrl+'/login', login)
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }

}
