import { Component, OnInit } from '@angular/core';
import { UserForRegistrationDto } from '../../../interfaces/userRegistrationDto';
import { RegistrationResponseDto } from '../../../interfaces/responseDto';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router} from '@angular/router'
import { CDK_DESCRIBEDBY_HOST_ATTRIBUTE } from '@angular/cdk/a11y';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('')
  });
  constructor(private userService: UserService,  private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
  }

  public validateControl = (controlName: string) => {
    if (this.registerForm)
    return this.registerForm.value[controlName].invalid && this.registerForm.value[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    if (this.registerForm)
    return this.registerForm.value[controlName].hasError(errorName)
  }
  public registerUser = (registerFormValue:any) => {
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };
    this.userService.registerUser(user)
    .subscribe( value =>  {console.log(value); 
      this.router.navigate(['/login'])})
    
    
  }
}
