import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '../models/page.response.model';

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
}
