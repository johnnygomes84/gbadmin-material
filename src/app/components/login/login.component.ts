import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { jwtDecode } from 'jwt-decode'
import { TokenDecode } from 'src/app/models/token.decode.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup
  tokenDecode: TokenDecode


  constructor(private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
     });

  }

  onSubmit() {
    localStorage.setItem("token", this.loginForm.value.email) 
    this.router.navigate([""]) 
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (data) => {
        sessionStorage.setItem('token', data.token)
        this.tokenDecode = jwtDecode(data.token)
        console.log(this.tokenDecode);
        

        if (this.tokenDecode.userinfo.firstLogin) {
          this.router.navigate([`first-login/${this.tokenDecode.userinfo.userId}`])
        }
        else {
          this.showMessage(`Success!`) 
          this.router.navigate([""])
        }

      },
      error: (err) => {
        this.showMessage(`Login fail, please check creadentials!`, true)
      }
    })
  }

  private showMessage(message: string, isError: boolean = false) {    
    this.snackBar.open(message, "X", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: isError ? ['snack-error'] : ['snack-success']
    })
  }

}
