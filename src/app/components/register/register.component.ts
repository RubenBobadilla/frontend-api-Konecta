import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/interfaces/auth/register';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, Register {
  
  /** Variables */
  public regUser : any;
  public name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  public password = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(
    private registerService: RegisterService,
    private router:Router  
  ) { }

  ngOnInit(): void {
  }

  registerIn(){
    this.regUser = {
      "name": this.name.value,
      "email": this.email.value,
      "password": this.password.value,
    }
    // Invocar el servicio http
    this.registerService.registerIn(this.regUser).subscribe(
      res => {
        alert(res.message);
        this.router.navigate(['login']);
        console.log(res);
      },
      error => {
        alert('ocurrio un error!!, comunicaquete con el Admin!!');
        console.log(error);
      }
    );
    
  }

 

}
