import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page.response.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url_base = "http://localhost:8080/api/student"

  constructor(private http: HttpClient ) { }

  getStudents(page?: number, size?: number){
    const params = new HttpParams()
    .set('page', page ? page : 0)
    .set('size', size ? size : 5)
    return this.http.get<PageResponse>(`${this.url_base}/all`, {params})
  }

  getById(id: string) {
    return this.http.get<Student>(`${this.url_base}/${id}`)
  }

  createOrUpdateStudent(student: Student) {
    if(student.id) {
      
      return this.http.put<Student>(`${this.url_base}/update/${student.id}`, student)      
    }
    return this.http.post<Student>(`${this.url_base}/new`, student)
  }

  deleteUserById(id: string) {    
    return this.http.delete<void>(`${this.url_base}/delete/${id}`)
  }

}
