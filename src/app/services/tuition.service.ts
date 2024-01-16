import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '../models/page.response.model';
import { Tuition } from '../models/tuition.model';

@Injectable({
  providedIn: 'root'
})
export class TuitionService {

  url_base = "http://localhost:8080/api/tuition"

  constructor(private http: HttpClient ) { }

  getTuitions(page?: number, size?: number){
    const params = new HttpParams()
    .set('page', page ? page : 0)
    .set('size', size ? size : 5)
    return this.http.get<PageResponse>(`${this.url_base}/all`, {params})
  }

  getById(id: string) {
    return this.http.get<Tuition>(`${this.url_base}/${id}`)
  }

  createOrUpdateTuition(tuition: Tuition) {
    if(tuition.id) {
      
      return this.http.put<Tuition>(`${this.url_base}/update/${tuition.id}`, tuition)      
    }
    return this.http.post<Tuition>(`${this.url_base}/new`, tuition)
  }

  deleteTuitionById(id: string) {    
    return this.http.delete<void>(`${this.url_base}/delete/${id}`)
  }
}
