import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { Create } from 'src/app/interfaces/role/create';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit, Create {

  public regRole: any;
  public name = new FormControl('', [Validators.required, Validators.maxLength(10)]);

  constructor(
    private roleService: RoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  store() :void{
    /** Crear el objeto */
    this.regRole = {
      "name": this.name.value     
    }
    /** Invocar la peticion http */
    this.roleService.store(this.regRole).subscribe(
      res => {
        console.log(res);
        alert(res.message);
        this.router.navigate(['/role/index']);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );

  }


}
