import { Component, OnInit } from '@angular/core';
import {LoginModel} from "../../models/login.model";
import {UserService} from "../../services/user.service";
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  credentials: LoginModel = {username:'', password:'',email: ''};
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    });
  }
  public clickRegister = () => {
    this.router.navigate(['/register']);
  }
  public login = (loginFormValue:any) => {
    const formValues = { ...loginFormValue };
    const login: LoginModel = {
      username: formValues.login,
      password: formValues.password,
      email: formValues.login
    };
    this.userService.loginUser(login)
    .subscribe({
      next: (value) => {
          const token = value.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(['container']) },
      error: (err: HttpErrorResponse) => {
        this.invalidLogin = true;
        this.router.navigate(['/register'])}
        })
  }

}
