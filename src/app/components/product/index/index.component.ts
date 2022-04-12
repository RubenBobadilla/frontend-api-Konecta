import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Index } from 'src/app/interfaces/product/index';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, Index {

  /** Variables */
  public showUpddate :boolean = false;
  public idProd: number;
  public products: any;
  public name: string;
  public dataentry: any;
  public produ: any;
  public verComponUpd = false;
  @Input() regProduct: any;



  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.index();

  }

  /** Lista todos los productos existentes */
  index(): object {
    this.productService.index().subscribe(
      res => {
        console.log(res);
        this.products = res;
      },
      error => {
        console.log(error);
      }
    );
    return this.products
  }

  /***
   *  Envia los datos por medio del Metodo Emit 
   * para que los reciba el componente Update y los procese*/
  send(id: number, name: string, reference: string, stock: number, price: number, category_id: number) {
    this.showUpddate = true;
    this.verComponUpd = true;
    console.log(this.products);
    this.regProduct = {
      "id": id,
      "name": name,
      "reference": reference,
      "stock": stock,
      "price": price,
      "category_id": category_id
    }
    this.productService.disparador.emit({
      data: this.regProduct
    })
  }

  /** Elimina un producto */
  destroy(id: number): void {
    this.idProd = id;
    this.productService.destroy(this.idProd).subscribe(
      res => {
        console.log(res);
        console.log('Producto Eliminado con éxito');
        alert(res.message + ' | ' + res.data.name);
        this.router.navigate(['/product/index']);
      },
      error => {
        alert('Existe un problema!, comunicate con el Admin!')
        console.log(error);
      }
    );
  }





}
