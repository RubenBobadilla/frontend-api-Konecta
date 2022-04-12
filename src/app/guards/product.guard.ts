import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    public router:Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot):boolean {    
    const expectedRole = route.data.expectedRole; // ADMIN
    const expectedRoleT = route.data.expectedRoleT; // SALE
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    /** Comparar los valores del role y adicional si esta autenticado */
    if((role !== expectedRole && role !== expectedRoleT) || !this.authService.isAuth() ){
      console.log('Usuario no autorizado para la vista Product!!');
      alert('Usuario no autorizado para la vista Product!!');
      this.router.navigate(['home']);
    }
    console.log(role);
    console.log(expectedRole);
    return true;
  }
  
}
