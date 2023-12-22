import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = route.data.role;
  const router = inject(Router);

  console.log('Admin guard');
  console.log(role);
  console.log(route.data);

  if(role === 'ADMIN') {    
    return true;
  } else {
    router.navigate(['unauthorized']);
    return false;
  }
};
