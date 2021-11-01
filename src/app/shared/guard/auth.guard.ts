import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../shared/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){
   
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     
    if(this.authService.isLoggedIn == false) {
      if(state.url=='/dashboard'){
       
      this.router.navigate(['']);

      }else{

        return true;
      }
    }else{
      if(state.url!='/dashboard'){

        this.router.navigate(['dashboard']);
      }else{

        return true;
      }
     
    }

  
    return true;
  }
  
}
