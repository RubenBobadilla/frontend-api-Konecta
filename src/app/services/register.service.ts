import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /** Variables */
  private URL: string;
  public user: string;

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { 
    this.URL = 'http://127.0.0.1:8000/api/auth';
  }
  
  /** Permite registrar un usuario nuevo */
  registerIn(user: JSON): Observable<any>{
    let params = JSON.stringify(user);
    return this.http.post(this.URL + '/register', params);
  }

}
