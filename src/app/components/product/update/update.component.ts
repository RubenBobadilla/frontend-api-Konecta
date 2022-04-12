import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Update } from 'src/app/interfaces/product/update';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, Update {

  /** Varibales */
  @Input() data : any;
  public idProd: number;
  public nameShow: string;
  public refShow: string;
  public stockShow: number;
  public priceShow: number;
  public regProduct: any;
  public categoryShow: number;
  public id = new FormControl('', [Validators.required]);
  public name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  public reference = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  public stock = new FormControl('', [Validators.required]);
  public price = new FormControl('', [Validators.required]);
  public category_id = new FormControl('', [Validators.required]);

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.productService.disparador.subscribe(data => {
      console.log('recibiendo');
      console.log(data);
      this.view(data);
    })
  }

  /** Asignar Valores al formulario de edición */
  view(data): void {
    console.log(data);
    let arrayIt = Object.values(data);
    console.log(arrayIt);
    this.idProd = arrayIt[0]['id'];
    this.nameShow = arrayIt[0]['name'];
    this.refShow = arrayIt[0]['reference'];
    this.stockShow = arrayIt[0]['stock'];
    this.priceShow = arrayIt[0]['price'];
    this.categoryShow = arrayIt[0]['category_id'];
    this.id = new FormControl(this.idProd);
    this.name = new FormControl(this.nameShow, [Validators.required, Validators.maxLength(50)]);
    this.reference = new FormControl(this.refShow, [Validators.required, Validators.maxLength(10)]);
    this.stock = new FormControl(this.stockShow, [Validators.required]);
    this.price = new FormControl(this.priceShow, [Validators.required]);
    this.category_id = new FormControl(this.categoryShow, [Validators.required]);
    console.log(this.idProd);
    /*alert('Su producto para edición es: ' + ' Id: ' + this.idProd + '- Name: ' + this.nameShow + '- Reference: ' + this.refShow
      + '- Stock: ' + this.stockShow + '- Price :' + this.priceShow);*/
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
    console.log(this.id.value);
    this.productService.update(this.regProduct, this.id.value).subscribe(
      res => {
        console.log(res.message);
        alert(res.message + ' | Producto: ' + this.regProduct.name);
        new FormControl().reset();
        this.router.navigate(['/product/index']);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );


  }

}
