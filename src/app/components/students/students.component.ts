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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;
  
  displayedColumns: string[] = ['studentNumber','name', 'lastName', 'rank', 'degree', 'status', 'actions'];
  
  dataSource: any  

  constructor(private studentService: StudentService){}


  ngOnInit(): void {
    this.getStudents()   
  }

  getStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.dataSource = this.dataSource = new MatTableDataSource<Student>(data);
      this.dataSource.paginator = this.paginator;
    })
  }
  
}
