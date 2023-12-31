import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'
import { TokenDecode } from 'src/app/models/token.decode.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  token: any = sessionStorage.getItem('token')
  tokenDecode: TokenDecode = jwtDecode(this.token)
  userInfo = this.tokenDecode.userinfo.fullName
  

   
  constructor(private router: Router){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout() {
      sessionStorage.removeItem("token")
      this.router.navigate(["login"])
    }
}
