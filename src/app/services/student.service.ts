import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url_base = "http://localhost:3001/student"

  constructor(private http: HttpClient ) { }

  getStudents(){
    return this.http.get<Student[]>(this.url_base)
  }

  getById(id: string) {
    return this.http.get<Student>(`${this.url_base}/${id}`)
  }

  createOrUpdateStudent(student: Student) {
    if(student.id) {
      
      return this.http.put<Student>(`${this.url_base}/${student.id}`, student)      
    }
    console.log("Saving")
    return this.http.post<Student>(this.url_base, student)
  }

  updateStudent(student: Student) {
    return this.http.put(this.url_base, student)
  }

  deleteUserById(id: string) {    
    return this.http.delete<void>(`${this.url_base}/${id}`)
  }

}
