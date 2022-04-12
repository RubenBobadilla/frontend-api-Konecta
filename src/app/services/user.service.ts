import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Variables */
  @Output() disparador: EventEmitter<any> = new EventEmitter();
  private URL: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.URL = 'http://127.0.0.1:8000/api/auth';
  }

   /** Peticion http Lista todos los usuarios existentes */
   index() : Observable<any>{
    return this.http.get(this.URL + '/users');    
  }

  /** Peticion http Guardar un usuario */
  store(user: JSON): Observable<any>{
    let params = JSON.stringify(user);
    return this.http.post(this.URL + '/users', params);
  }

  /** Actualiz un usuario */
  update(user: JSON, idUser : number): Observable<any>{
    let params = JSON.stringify(user);
    return this.http.put(this.URL + '/users/'+idUser, params);
  }

  destroy(idUser : number): Observable<any>{
    return this.http.delete(this.URL + '/users/'+idUser);
  }
}
