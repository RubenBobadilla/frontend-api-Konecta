import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Create } from 'src/app/interfaces/user/create';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, Create {

  /** Variables */
  public regUser: any;
  public name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  public email = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public role = new FormControl('', [Validators.required, Validators.maxLength(15)]);

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /** Almacena un usuario */
  store(): void {
    /** Crear el objeto */
    this.regUser = {
      "name": this.name.value,
      "email": this.email.value,
      "password": this.password.value,
      "role": this.role.value
    }
    /** Invocar la peticion http */
    this.userService.store(this.regUser).subscribe(
      res => {
        console.log(res.message);
        alert(res.message);
        this.router.navigate(['/user/index']);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );
  }

}
