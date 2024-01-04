import { Component, OnInit, ViewChild  } from '@angular/core';
import {MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  pageEvent: PageEvent;
  
  displayedColumns: string[] = ['email', 'name', 'lastName','role', 'firstLogin', 'actions'];
  
  dataSource = new MatTableDataSource<User>([]);  
  pageIndex = 0
  pageSize = 5
  length:number

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUsers()   
  }

  getUsers() {
    
    this.userService.getUsers(this.pageIndex, this.pageSize).subscribe(data => {
        
        this.length = data.totalElements      
        this.dataSource.data = data.content                           
      
    })
  }

  deleteUser(user: User) {
    if(confirm(`Are you sure you want to delete user: ${user.name} ${user.lastName}?`)) {
      if (user.id) {        
        this.userService.deleteUserById(user.id).subscribe(()=> {
          this.getUsers()          
        }) 
      }
    }

  }

  pageChangeEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  } 


}
