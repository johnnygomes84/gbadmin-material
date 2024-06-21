import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RankEnum } from 'src/app/models/enums/rankEnum.model';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

  studentForm!: FormGroup;
  ranks = Object.values(RankEnum)
  id: string
  studentNumber?: number
  student: Student

  constructor(
    private StudentService: StudentService, 
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      rank: ['', Validators.required],
      degree: ['', Validators.required],
      classType: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required]
    });

    if(this.id) {
      this.StudentService.getById(this.id)
        .subscribe(data => {
          this.student = data
          this.studentNumber = this.student.studentNumber          
          this.studentForm.patchValue(data)
        })
    }
  }

  onSubmit(){
    this.student = this.studentForm.value
    if(this.id) {
      this.student.id = this.id
      this.student.studentNumber = this.studentNumber
    }

    this.StudentService.createOrUpdateStudent(this.student)
    .subscribe({
      next: (data) => { 
        this.showMessage(`Success, student ${data.name} created!`) 
        this.router.navigate(["/students"])
      },
      error: (err) => { 
        this.showMessage(`Error, student not created!`, true)
        this.router.navigate(["/students"])
       }
    })
  }

  cancel() {
    this.router.navigate(["/students"])
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
