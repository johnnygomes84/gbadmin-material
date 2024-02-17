import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashBoardDto } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url_base = "http://localhost:8080/api/dashboard"

  constructor(private http: HttpClient ) { }

  getFullDash() {
    return this.http.get<DashBoardDto>(`${this.url_base}/full`)
  }
}
