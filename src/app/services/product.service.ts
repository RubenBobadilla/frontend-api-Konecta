import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  /** Variables */
  @Output() disparador:EventEmitter<any> = new EventEmitter();
  private URL: string;

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { 
    this.URL = 'http://127.0.0.1:8000/api/auth';
  }

  /** Peticion http Lista todos los productos existentes */
  index() : Observable<any>{
    return this.http.get(this.URL + '/products');    
  }

  /** Peticion http Obtener un producto */
  show(id : number): Observable<any>{
    return this.http.get(this.URL + '/products/'+id);
  }

  /** Peticion http Guardar un producto */
  store(product: JSON): Observable<any>{
    let params = JSON.stringify(product);
    return this.http.post(this.URL + '/products', params);
  }

  /** Actualiz un producto */
  update(product: JSON, idProd : number): Observable<any>{
    let params = JSON.stringify(product);
    return this.http.put(this.URL + '/products/'+idProd, params);
  }

  destroy(idProd : number): Observable<any>{
    return this.http.delete(this.URL + '/products/'+idProd);
  }

}
