import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const anonymousGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  if(token) {
    router.navigate(['']);
    return false;    
  }
  return true
};
