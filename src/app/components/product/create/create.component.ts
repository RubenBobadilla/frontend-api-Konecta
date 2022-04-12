import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Create } from 'src/app/interfaces/product/create';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, Create {

  /** Variables */
  public regProduct: any;
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
        this.router.navigate(['/product/index']);
      },
      error => {
        alert(error);
        console.log(error);
      }
    );
  }

}
