import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  userForm!: FormGroup;
  id: string

  constructor(
    private userService: UserService,
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {

    this.id = this.activeRouter.snapshot.params['id'];
    
    this.userForm = this.formBuilder.group({
      firstLogin: true,
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });

    
    if(this.id) {
      this.userService.getById(this.id)
        .subscribe(data => {
          this.userForm.patchValue(data)
        })
    }
    
  }

  onSubmit(){    

    this.userService.createOrUpdateUser(this.userForm.value)
    .subscribe({
      next: (data) => { 
        this.showMessage(`Success, user ${data.name} created!`) 
        this.router.navigate(["/users"])
      },
      error: (err) => { 
        this.showMessage(`Error, user not created!`, true)
        this.router.navigate(["/users"])
       }
    })
  }

  cancel() {
    this.router.navigate(["/users"])
  }

  showMessage(message: string, isError: boolean = false) {    
    this.snackBar.open(message, "close", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: isError ? ['snack-error'] : ['snack-success']
    })
  }

}
