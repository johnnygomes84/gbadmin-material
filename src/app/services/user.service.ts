import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin } from '../models/auth-login.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_base = "http://localhost:8080/auth"

  constructor(private http: HttpClient) { }

  login(credentials: AuthLogin) {
    return this.http.post<AuthResponse>(`${this.url_base}/login`, credentials)
  }
}
