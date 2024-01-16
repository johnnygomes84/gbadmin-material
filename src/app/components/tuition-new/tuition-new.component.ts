import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RankEnum } from 'src/app/models/enums/rankEnum.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Tuition } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/tuition.service';

@Component({
  selector: 'app-tuition-new',
  templateUrl: './tuition-new.component.html',
  styleUrls: ['./tuition-new.component.css']
})
export class TuitionNewComponent {

  tuitionForm!: FormGroup;
  ranks = Object.values(RankEnum)
  id: string
  studentNumber?: number
  tuition: Tuition

  moneyPattern = "^[a-z0-9_]{8,15}€"

  constructor(
    private tuitionService: TuitionService, 
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    
    this.tuitionForm = this.formBuilder.group({
      studentNumber: ['', Validators.required],
      name: null,
      lastName: null,
      refMonth: ['', Validators.required],
      amount: ['', Validators.required, Validators.pattern(this.moneyPattern)]
    });

    this.tuitionForm.controls['name'].disable()
    this.tuitionForm.controls['lastName'].disable()

    if(this.id) {
      this.tuitionService.getById(this.id)
        .subscribe(data => {
          this.tuition = data
          this.tuitionForm.patchValue(data)
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

}
