import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Update } from 'src/app/interfaces/product/update';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, Update {

  /** Varibales */
  public regUser : any;
  public idUser : number;
  public nameShow :string;
  public emailShow : string;
  public roleShow : string;
  public id = new FormControl('', [Validators.required]);
  public name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  public email = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public role = new FormControl('', [Validators.required, Validators.maxLength(15)]);

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.disparador.subscribe(data => {
      console.log('Recibiendo');
      console.log(data);  
      this.view(data);
    })
  }

  /** Procesa la info que viene del componente Index y la muestra en la vista */
  view(data): void {
    console.log(data);
    let arrayIt = Object.values(data);
    console.log(arrayIt);
    this.idUser = arrayIt[0]['id'];
    this.nameShow = arrayIt[0]['name'];
    this.emailShow = arrayIt[0]['email'];
    this.roleShow = arrayIt[0]['role'];
    this.id = new FormControl(this.idUser, [Validators.required]);
    this.name = new FormControl(this.nameShow, [Validators.required, Validators.maxLength(50)]);
    this.email = new FormControl(this.emailShow, [Validators.required, Validators.maxLength(100)]);
    this.role = new FormControl(this.roleShow, [Validators.required, Validators.maxLength(15)]);
    this.password = new FormControl('');
    console.log(this.idUser);
  }

    /** Actualiza un producto */
    update(): void {
      /** Crear el objeto */
      this.regUser = {
        "name": this.name.value,
        "email": this.email.value,
        "role": this.role.value,
        "password": this.password.value
      }
      console.log(this.regUser);
      console.log(this.id.value);
      this.userService.update(this.regUser, this.id.value).subscribe(
        res => {
          console.log(res.message);
          alert(res.message + ' | Usuario: ' + this.regUser.name);
          new FormControl().reset();
          this.router.navigate(['/user/index']);
        },
        error => {
          alert(error);
          console.log(error);
        }
      );  
  
    }


}
