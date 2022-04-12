import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Index } from 'src/app/interfaces/user/index';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit, Index {

  /** Variables */
  public idUser: number;
  public users: any;
  @Input() regUser: any;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.index();
  }

   /** Lista todos los Usuarios existentes */
   index(): object {
    this.userService.index().subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      error => {
        console.log(error);
      }
    );
    return this.users
  }

  /***
   *  Envia los datos por medio del Metodo Emit 
   * para que los reciba el componente Update y los procese*/
   send(id: number, name: string, email: string, role: string) {
    console.log(this.users);
    this.regUser = {
      "id": id,
      "name": name,
      "email": email,
      "role": role
    }
    this.userService.disparador.emit({
      data: this.regUser
    })
  }

 /** Elimina un User */
 destroy(id: number): void {
  this.idUser = id;
  this.userService.destroy(this.idUser).subscribe(
    res => {
      console.log(res);
      console.log('Usuario Eliminado con éxito');
      alert(' | Usuario Eliminado con éxito');
      this.router.navigate(['/user/index']);
    },
    error => {
      alert('Existe un problema!, comunicate con el Admin!')
      console.log(error);
    }
  );
}

}
