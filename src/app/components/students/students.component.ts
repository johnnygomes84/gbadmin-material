import { Component, OnInit, ViewChild  } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import {MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  pageEvent: PageEvent;
  
  displayedColumns: string[] = ['studentNumber','name', 'lastName', 'rank', 'degree', 'status', 'actions'];
  
  dataSource = new MatTableDataSource<Student>([]);  
  pageIndex = 0
  pageSize = 5
  length:number

  constructor(private studentService: StudentService){}


  ngOnInit(): void {
    this.getStudents()   
  }

  getStudents() {
    
    this.studentService.getStudents(this.pageIndex, this.pageSize).subscribe(data => {
        
        this.length = data.totalElements      
        this.dataSource.data = data.content                           
      
    })
  }

  pageChangeEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getStudents();
}
  
}
