import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url_base = "http://localhost:3001/student"

  constructor(private http: HttpClient ) { }

  getStudents(){
    return this.http.get<Student[]>(this.url_base)
  }

  createNewStudent(student: Student) {
    return this.http.post<Student>(this.url_base, student)
  }

  updateStudent(student: Student) {
    return this.http.put(this.url_base, student)
  }

  deleteUserById(id: string) {
    return this.http.delete<void>(`${this.url_base}/${id}`)
  }

}
