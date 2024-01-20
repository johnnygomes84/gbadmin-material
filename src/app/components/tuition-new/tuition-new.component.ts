import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RankEnum } from 'src/app/models/enums/rankEnum.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Tuition } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/tuition.service';
import { MonthsEnum } from 'src/app/models/enums/monthsEnum.model';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-tuition-new',
  templateUrl: './tuition-new.component.html',
  styleUrls: ['./tuition-new.component.css']
})
export class TuitionNewComponent {

  tuitionForm!: FormGroup;
  id: string
  studentNumber: number
  tuition: Tuition
  months = Object.values(MonthsEnum)
  student?: Student

  constructor(
    private tuitionService: TuitionService, 
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private studentService: StudentService
  ){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    
    this.tuitionForm = this.formBuilder.group({
      studentNumber: ['', Validators.required],
      name: null,
      lastName: null,
      referenceMonth: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.tuitionForm.controls['name'].disable()
    this.tuitionForm.controls['lastName'].disable()

    if(this.id) {
      this.tuitionService.getById(this.id)
        .subscribe(data => {
          this.tuition = data
          this.tuitionForm.patchValue(data)

          this.studentNumber = this.tuitionForm.controls["studentNumber"]?.value
      
          this.studentService.getByStudentNumber(this.studentNumber).subscribe({
            next: data => this.student = data,
            error: err => this.showMessage(`Error, student not found with number ${this.studentNumber}!`, true)
          })
        })

    }
  }

  onSubmit(){
    this.tuition = this.tuitionForm.value
    if(this.id) {
      this.tuition.id = this.id
    }

    this.tuitionService.createOrUpdateTuition(this.tuition)    
    .subscribe({
      next: (data) => { 
        this.showMessage(`Success, tuition created!`) 
        this.router.navigate(["/tuitions"])
      },
      error: (err) => { 
        this.showMessage(`Error, student not created!`, true)
        this.router.navigate(["/tuitions"])
       }
    })
  }

  cancel() {
    this.router.navigate(["/tuitions"])
  }

  showMessage(message: string, isError: boolean = false) {    
    this.snackBar.open(message, "close", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: isError ? ['snack-error'] : ['snack-success']
    })
  }

  onTabPress(event: any) {
    const currentValue = event.target.value;
    this.studentService.getByStudentNumber(currentValue).subscribe({
      next: data => this.student = data,
      error: err => this.showMessage(`Error, student not found with number ${currentValue}!`, true)
    })    
   }

}
