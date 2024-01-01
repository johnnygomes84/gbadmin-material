import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin } from '../models/auth-login.model';
import { AuthResponse } from '../models/auth-response.model';
import { PageResponse } from '../models/page.response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_base = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  login(credentials: AuthLogin) {
    return this.http.post<AuthResponse>(`${this.url_base}/auth/login`, credentials)
  }

  getUsers(page?: number, size?: number) {
    const params = new HttpParams()
    .set('page', page ? page : 0)
    .set('size', size ? size : 5)
    return this.http.get<PageResponse>(`${this.url_base}/all`, {params})
  }

  getById(id: string) {
    return this.http.get<User>(`${this.url_base}/api/users/${id}`)
  }

  createOrUpdateUser(user: User) {
    if(user.id) {
      
      return this.http.put<User>(`${this.url_base}/api/users/update/${user.id}`, user)      
    }
    return this.http.post<User>(`${this.url_base}/api/users/register`, user)
  }

  deleteUserById(id: string) {    
    return this.http.delete<void>(`${this.url_base}/api/users/delete/${id}`)
  }

}
