import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;


  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
     });
  }

  onSubmit() {
    localStorage.setItem("token", this.loginForm.value.email) 
    this.router.navigate([""]) 
  }

}
