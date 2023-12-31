import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token')

  if(token) {
    console.log("we have token from authguard");
    
    return true;

  } else {
    console.log("NO TOKEN from authguard");
    router.navigate(['login'])
    return false;
  }
};
