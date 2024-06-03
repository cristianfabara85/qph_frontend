import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/interface/product.services';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {

  constructor( public productService: ProductService) {
  }

  displayDialog: boolean;

    product: any = {};
    selectedProduct: any;
    newUser: boolean;
    listProducts: any[];
    cols: any[];

// tslint:disable-next-line:typedef
ngOnInit() {

  this.displayDialog = false;
  this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'precioUnidad', header: 'Precio Unitario' },
  ];
  this.getProducts();
}

  // tslint:disable-next-line:typedef
  showDialogToAdd() {
    this.newUser = true;
    this.product = {};
    this.displayDialog = true;
  }

  // tslint:disable-next-line:typedef
  save() {
   const listUsers = [...this.listProducts];

   if (this.newUser) {
    this.productService.saveProducts(this.product).subscribe(response => {
      this.getProducts();
      this.product = null;
      this.displayDialog = false;
     });
   }
    else {
      listUsers[this.listProducts.indexOf(this.selectedProduct)] = this.product;
      this.productService.saveProducts(this.product).subscribe(response => {
        this.getProducts();
        this.product = null;
        this.displayDialog = false;
       });

    }
  }

  // tslint:disable-next-line:typedef
  delete(product: any) {
  this.productService.deleteProducts(product.productoId).subscribe(response => {
     this.getProducts();
     this.product = null;
     this.displayDialog = false;
   });
  }

  // tslint:disable-next-line:typedef
  onRowSelect(event) {
    this.newUser = false;
    this.product = this.cloneCar(event);
    this.displayDialog = true;
  }

  cloneCar(c: any): any {
    const user = {};
    // tslint:disable-next-line:forin
    this.product = c;
    // tslint:disable-next-line: forin
    for (const prop in c) {
      user[prop] = c[prop];
    }
    return this.product;
  }

  // tslint:disable-next-line:typedef
  getProducts() {
    this.productService.findAllProducts().subscribe(response => {
        this.listProducts = response;
      });
  }

}


