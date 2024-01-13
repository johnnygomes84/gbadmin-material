import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { TokenDecode } from 'src/app/models/token.decode.model';

export const firstLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token') as any
  
  if(token) {
      const tokenDecode: TokenDecode = jwtDecode(token);  
      if(tokenDecode?.userinfo.firstLogin) {    
        return true;
      }
      else {
          router.navigate([""])
          return false 

      }
      
  }
  else {
    router.navigate(["/login"])
    return false;
  }

  
};
