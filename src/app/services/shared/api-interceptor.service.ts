import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

    constructor(private router: Router) {}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = sessionStorage.getItem('token')

    let authRequest : any;
    if(token){
      authRequest = request.clone({
          setHeaders: {
              'Authorization' : token
          }
      });
      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status ===  401 || error.status ===  403) {
            alert("Your Session has expired, please login again!")
            sessionStorage.removeItem('token')
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error(error.message));
        })
      );    
  }else {
    return next.handle(request);
  }
  
  } 
}
