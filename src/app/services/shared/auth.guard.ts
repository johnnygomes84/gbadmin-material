import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthShared } from './auth-shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthShared)

  if(auth.loggedUser.token) {
    console.log("we have token from authguard");
    
    return true;

  } else {
    console.log("NO TOKEN from authguard");
    router.navigate(['login'])
    return false;
  }
};
