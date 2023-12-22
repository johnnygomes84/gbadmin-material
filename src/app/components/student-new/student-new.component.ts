import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RankEnum } from 'src/app/models/enums/rankEnum.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

  studentForm!: FormGroup;
  ranks = Object.values(RankEnum)

  constructor(
    private StudentService: StudentService, 
    private router: Router, 
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      rank: ['', Validators.required],
      degree: ['', Validators.required],
      classType: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit(){
    this.StudentService.createNewStudent(this.studentForm.value).subscribe(data => {
        this.router.navigate(["/students"])
    })
  }

}
