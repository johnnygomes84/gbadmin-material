import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthShared } from './auth-shared.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  shared: AuthShared
  constructor() {
    this.shared = AuthShared.getInstance()    
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Outgoing HTTP request', request);
    let authRequest : any;
    if(this.shared.loggedUser){
      authRequest = request.clone({
          setHeaders: {
              'Authorization' : this.shared.loggedUser.token
          }
      });
      return next.handle(authRequest).pipe(
        tap((event: HttpEvent<any>) => {
          console.log('Incoming HTTP response', event);
        })
      );    
  }else {
    return next.handle(request);
}
  
}
}
