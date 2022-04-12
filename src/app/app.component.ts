import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'frontend-api-k';
  public log : boolean;
  public token : any;
  public role :String;
  public res :Boolean;

  constructor(private jwtHelper:JwtHelperService){
    this.log = false;
    this.token = localStorage.getItem('token');   
    this.role = localStorage.getItem('role');
    this.res =  this.jwtHelper.isTokenExpired(this.token);
    console.log(this.res);
  }
  ngOnInit(): void {
    this.logUser();
  }

  logUser():boolean{
    this.token = localStorage.getItem('token'); // Obtener token en LocalStorage
    if (this.token){
      this.log = true;
    }
    return this.log;
  }
}
