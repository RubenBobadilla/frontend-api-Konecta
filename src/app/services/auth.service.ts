import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Declarar las variables */
  private URL: string;
  public user: string;
  public res: boolean;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.URL = 'http://127.0.0.1:8000/api/auth';
  }

  /** Permite Loguear un usuario existente */
  singIn(user: JSON): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + '/login', params);
  }

  //** Valida si el token existe o ha Expirado */
  isAuth(): Boolean {
    this.res = true;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      this.res = false;
    }
    return this.res;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }
}
