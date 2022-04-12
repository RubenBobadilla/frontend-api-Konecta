import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    public router:Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    //console.log(decode(token));
    /** Comparar los valores del role y adicional si esta autenticado */
    if(role !== expectedRole || !this.authService.isAuth() ){
      console.log('Usuario no autorizado para esta vista!!');
      alert('Usuario no autorizado para esta vista!!');
      this.router.navigate(['home']);
    }
    console.log(role);
    console.log(expectedRole);

    return true;
  }

}
