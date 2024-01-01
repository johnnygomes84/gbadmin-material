import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { User } from 'src/app/models/user.model';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  id: string
  type: string
  deleteUserData?: User
  deleteStudentData?: Student

  constructor(
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private studentService: StudentService){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    this.type = this.activeRouter.snapshot.params['type'];

    if (this.type === "user") {
      this.getUserById()

    } else if(this.type === "student") {
      this.getStudentById()

    }
    
  }

  deleteRegister() {
    if(this.type === "user") {
      this.userService.deleteUserById(this.id).subscribe(()=> {
        this.router.navigate(["/users"])
      })
    }
    else if (this.type === "student") {
      this.studentService.deleteUserById(this.id).subscribe(()=> {
        this.router.navigate(["/students"])
      })
    }

  }

  getStudentById() {
    this.studentService.getById(this.id)
    .subscribe({
      next: (data)=> this.deleteStudentData = data
    })
  }

  getUserById() {
    this.userService.getById(this.id)
    .subscribe({
      next: (data)=> this.deleteUserData = data
    })
  }

  cancel() {
    if(this.type === "user") {
      this.router.navigate(["/users"])
    }
    else if (this.type === "student") {
      this.router.navigate(["/students"])
    }
  }


}
