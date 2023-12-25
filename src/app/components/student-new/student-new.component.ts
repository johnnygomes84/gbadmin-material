import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { RankEnum } from 'src/app/models/enums/rankEnum.model';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

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
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      rank: ['', Validators.required],
      degree: ['', Validators.required],
      classType: ['', Validators.required],
      status: ['', Validators.required]
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
    .subscribe(data => {
        this.router.navigate(["/students"])
    })
  }

  cancel() {
    this.router.navigate(["/students"])
  }

}
