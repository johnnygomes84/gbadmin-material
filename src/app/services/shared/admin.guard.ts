import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { TokenDecode } from 'src/app/models/token.decode.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token') as any
  const tokenDecode: TokenDecode = jwtDecode(token);  

  if(tokenDecode.userinfo.role === 'ROLE_ADMIN') {    
    return true;
  } else {
    router.navigate(['unauthorized']);
    return false;
  }
};
