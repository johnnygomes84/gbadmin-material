import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthShared } from './auth-shared.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = route.data.role;
  const router = inject(Router);
  const auth = inject(AuthShared);

  if(auth.loggedUser.role === 'ROLE_ADMIN') {    
    return true;
  } else {
    router.navigate(['unauthorized']);
    return false;
  }
};
