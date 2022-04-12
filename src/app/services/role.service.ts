import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  /** Variables */
  @Output() disparador: EventEmitter<any> = new EventEmitter();
  private URL: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.URL = 'http://127.0.0.1:8000/api/auth';
  }

  /** Peticion http Lista todos los Roles existentes */
  index(): Observable<any> {
    return this.http.get(this.URL + '/roles');
  }

  /** Peticion http Guardar un Role */
  store(role: JSON): Observable<any> {
    let params = JSON.stringify(role);
    return this.http.post(this.URL + '/roles', params);
  }

  /** Actualiz un Role */
  update(role: JSON, idRole: number): Observable<any> {
    let params = JSON.stringify(role);
    return this.http.put(this.URL + '/roles/' + idRole, params);
  }

  destroy(idRole:number){
    return this.http.delete(this.URL + '/roles/'+idRole);
  }


}
