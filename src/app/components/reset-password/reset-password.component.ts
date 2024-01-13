import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassDto } from 'src/app/models/enums/reset-pass.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  id: string
  resetEmail: string
  defaultPass: string = "@Reset123"

  constructor(
    private activeRouter: ActivatedRoute, 
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    this.getUserById()    
  }


  getUserById() {
    this.userService.getById(this.id)
    .subscribe({
      next: (data)=> this.resetEmail = data.email
    })

    this.resetPass()
  }

  resetPass() {   
    const resetDto: ResetPassDto = {id: this.id, newPass: this.defaultPass, userRequest: "ADMIN"}


    this.userService.resetPassword(resetDto).subscribe({
      next: (data) => console.log("Sucess to reset password" + resetDto.newPass)
      
    })
  }

  return() {
    this.router.navigate(["/users"])
  }

}
