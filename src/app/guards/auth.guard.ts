import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }

  /** Valida  si el Token expiro  */
  canActivate(){
    let res = true;
    if(!this.authService.isAuth()){
      console.log('Token no Válido o ya expiró');
      alert('Token no Válido o ya expiró');
      this.router.navigate(['login']);

      res = false;
    }
   return res;
  }


  
}
