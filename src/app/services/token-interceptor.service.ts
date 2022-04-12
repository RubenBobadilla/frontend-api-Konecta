import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor() { }

  intercept(req, next){
    const token = localStorage.getItem('token'); 
    if(token){
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer '+token) });
    }
    if(!req.headers.has('Content-Type')){
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req);    
  }

}
