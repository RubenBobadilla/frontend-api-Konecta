import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, Product {

  /** Vairables */
  public idProd: number;
  public products: any;
  public regProduct: any;
  public createdproduct: boolean;
  public updateproduct: boolean;
  public nameShow: string;
  public refShow: string;
  public stockShow: number;
  public priceShow: number;
  public categoryShow: number;
  public name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  public reference = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  public stock = new FormControl('', [Validators.required]);
  public price = new FormControl('', [Validators.required]);
  public category_id = new FormControl('', [Validators.required]);

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {
   
  }
  
  ngOnInit(): void {
    this.createdproduct = false;
    this.updateproduct = false;
    this.index();
  }

  /** Lista todos los productos existentes */
  index(): object {
    this.productService.index().subscribe(
      res => {
        console.log(res);
        this.products = res;
        this.router.navigate(['product']);
      },
      error => {
        console.log(error);
      }
    );
    return this.products
  }

  /** Almacena un producto */
  store(): void {
    /** Crear el objeto */
    this.regProduct = {
      "name": this.name.value,
      "reference": this.reference.value,
      "stock": this.stock.value,
      "price": this.price.value,
      "category_id": this.category_id.value
    }
    /** Invocar la peticion http */
    this.productService.store(this.regProduct).subscribe(
      res => {
        console.log(res.message);
        alert(res.message);
        this.createdproduct = false;
      },
      error => {
        alert(error);
        console.log(error);
      }
    );
  }

  /** Consulta un producto */
  show(id: number): void {
    console.log(id);
    this.idProd = id;
    this.updateproduct = true;
    this.productService.show(id).subscribe(
      res => {
        console.log(res);
        console.log(res.name);
        //this.prueba = res.name;
        this.name = new FormControl(this.nameShow = res.name, [Validators.required, Validators.maxLength(50)]);
        this.reference = new FormControl(this.refShow = res.reference, [Validators.required, Validators.maxLength(50)]);
        this.stock = new FormControl(this.stockShow = res.stock, [Validators.required, Validators.maxLength(50)]);
        this.price = new FormControl(this.priceShow = res.price, [Validators.required, Validators.maxLength(50)]);
        this.category_id = new FormControl(this.categoryShow = res.category_id, [Validators.required, Validators.maxLength(50)]);
        new FormControl().reset();
      },
      error => {
        alert('Existe un problema!, comunicate con el Admin!')
        console.log(error);
      }
    );
  }

  /** Actualiza un producto */
  update(): void {
    /** Crear el objeto */
    this.regProduct = {
      "name": this.name.value,
      "reference": this.reference.value,
      "stock": this.stock.value,
      "price": this.price.value,
      "category_id": this.category_id.value
    }
    console.log(this.regProduct);
    /** Invocar la peticion http */
    this.productService.update(this.regProduct, this.idProd).subscribe(
      res => {
        console.log(res.message);
        alert(res.message + ' | Producto: ' + this.regProduct.name);
        this.createdproduct = false;
        this.updateproduct = false;
        this.router.navigate(['product']);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );
  }

  /** Elimina un producto */
  destroy(id: number): void {
    this.idProd = id;
    this.productService.destroy(this.idProd).subscribe(
      res => {
        console.log(res);
        console.log('Producto Eliminado con exito');
        alert(res.message +' | '+res.data.name);
        this.router.navigate(['product']);
      },
      error => {
        alert('Existe un problema!, comunicate con el Admin!')
        console.log(error);
      }
    );
  }

  /** Pivote para cargar la vista Create */
  changeToCreate(): void {
    this.createdproduct = true;
  }

  /** Pivote para cargar la vista Update */
  changeToUpdate(): void {
    this.updateproduct = true;
  }


}




