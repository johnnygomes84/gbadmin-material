import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassDto } from 'src/app/models/enums/reset-pass.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {

  resetPassForm: FormGroup
  id: string

  constructor(
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private userService: UserService) {

      this.id = this.activeRouter.snapshot.params['id'];

      this.resetPassForm = new FormGroup(
        {
          password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
          confirmPass: new FormControl(null, [Validators.required]),
        },
          this.passwordMatch('password', 'confirmPass')
        );                
  }

  submit() {
    const passDto: ResetPassDto = {id: this.id, newPass: this.resetPassForm.controls['password'].value, userRequest: "SUPPORT"}
    this.userService.resetPassword(passDto).subscribe({
      next: data => this.router.navigate(["/"])
    })
    sessionStorage.removeItem("token")
    this.router.navigate(["/login"])
    
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

}