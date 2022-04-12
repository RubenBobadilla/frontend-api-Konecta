import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { Index } from 'src/app/interfaces/role/index';


@Component({
  selector: 'app-index-role',
  templateUrl: './index-role.component.html',
  styleUrls: ['./index-role.component.css']
})
export class IndexRoleComponent implements OnInit, Index {

  /** Variables */
  public idRole: number;
  public roles: any;
  @Input() 
  regRole : any;

  constructor(
    private roleService: RoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.index();
  }

  /** Lista todos los roles existentes */
  index(): object {
    this.roleService.index().subscribe(
      res => {
        console.log(res);
        this.roles = res;
      },
      error => {
        console.log(error);
      }
    );
    return this.roles;
  }
  
  /***
   *  Envia los datos por medio del Metodo Emit 
   * para que los reciba el componente Update y los procese*/
   send(id: number, name : string) {
    this.regRole = {
      "id": id,
      "name": name
    }
    //this.router.navigate(['/role/update']);
    this.roleService.disparador.emit({
      data: this.regRole
    });

  }

  /** Elimina un producto */
  destroy(id: number): void {
    this.idRole = id;
    this.roleService.destroy(this.idRole).subscribe(
      res => {
        console.log(res);
        console.log('Role Eliminado con éxito');
        alert('Role Eliminado con éxito!');
        this.router.navigate(['/role/index']);
      },
      error => {
        alert('Existe un problema!, comunicate con el Admin!')
        console.log(error);
      }
    );
  }


}
