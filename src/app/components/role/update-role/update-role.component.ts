import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Update } from 'src/app/interfaces/role/update';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit, Update {

  /** Varibales */
  public idRole: number;
  public nameRole: string;
  public regRole: any;
  public id = new FormControl('', [Validators.required]);
  public name = new FormControl('', [Validators.required, Validators.maxLength(10)]);

  constructor(
    private roleService: RoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roleService.disparador.subscribe(data => {
      console.log('recibiendo');
      console.log(data);
      this.view(data);
    })
  }

  /** Asignar Valores al formulario de edición */
  view(data): void {
    console.log(data);
    let arrayIt = Object.values(data);
    this.idRole = arrayIt[0]['id'];
    this.nameRole = arrayIt[0]['name'];    
    this.id = new FormControl(this.idRole);
    this.name = new FormControl(this.nameRole, [Validators.required, Validators.maxLength(10)]);
  }

   /** Actualiza un producto */
   update(): void {
    /** Crear el objeto */
    this.regRole = {
      "name": this.name.value
    }
    console.log(this.regRole);
    console.log(this.id.value);
    this.roleService.update(this.regRole, this.id.value).subscribe(
      res => {
        console.log(res.message);
        alert(res.message + ' | Role: ' + this.regRole.name);
        new FormControl().reset();
        this.router.navigate(['/role/index']);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );


  }


}
