import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { TokenDecode } from 'src/app/models/token.decode.model';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token')

  if(token) {
    console.log("we have token from authguard");
    const tokenDecode: TokenDecode = jwtDecode(token);  
      if(tokenDecode.userinfo.firstLogin) { 
        router.navigate([`first-login/${tokenDecode.userinfo.userId}`])   
        return false;
      }
      else {
        return true;
      }
    

  } else {
    console.log("NO TOKEN from authguard");
    router.navigate(['login'])
    return false;
  }
};
