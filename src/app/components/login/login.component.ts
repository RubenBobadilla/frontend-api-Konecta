import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logUser :any;
  public log :boolean;
  public role : String;
  public email = new FormControl('', [Validators.required, Validators.maxLength(30)])
  public password = new FormControl('', [Validators.required, Validators.minLength(5)])

  constructor(
    private authService: AuthService,
    private router:Router  
  ) 
    {   }

  ngOnInit(): void {
  }

  /** Recibe los datos de Login y los pasa como paramentro JSON al authService */
  login(){  
    this.logUser = { 
      "email": this.email.value,
      "password": this.password.value
    }
    // Invoca el servicio de peticion  
    this.authService.singIn(this.logUser).subscribe(
      res => {
        localStorage.setItem('token', res.token); // Guardar token en LocalStorage
        localStorage.setItem('role', res.user.role); // Guardar role en LocalStorage
        this.role = res.user.role;
        this.router.navigate(['principal']); // Redirigir al modulo/ruta ppal
        console.log(res.user.role);
      },
      error => {
        console.log(<any>error);
      }
    )
    console.log(this.email.value + ' ' + this.password.value);
  }

}
