import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {


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
        tap((event: HttpEvent<any>) => {
        })
      );    
  }else {
    return next.handle(request);
}
  
}
}
