import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/interface/stock.services';
import { ProductService } from 'src/app/services/interface/product.services';
import { Message, MessageService } from 'primeng/api';
import { StockModel } from 'src/app/services/models/stock.model';
import { WebElementCondition } from 'selenium-webdriver';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styles: []
})
export class StockComponent implements OnInit {

  constructor(public stockService: StockService, private productService: ProductService,
              private messageService: MessageService) {
  }

  displayDialog: boolean;

  stock: StockModel = new StockModel();
  selectedProduct: any;
  newStock: boolean;
  listStock: any[];
  cols: any[];
  listProducts: any[];
  selectProduct: any = {};
  msgs: Message[];
  // tslint:disable-next-line:typedef
  ngOnInit() {

    forkJoin({
      stock: this.getStock(),
      products: this.getCatalogoProducts()
    }).subscribe(result => {
      this.listStock = result.stock;
      this.listProducts = result.products;
      this.processStockData();
    });
    this.displayDialog = false;
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre Producto' },
      { field: 'entradas', header: 'Entradas' },
      { field: 'salidas', header: 'Salidas' },
      { field: 'disponible', header: 'Cantidad Disponible' },

    ];
    this.getStock();
  }

  // tslint:disable-next-line:typedef
  showDialogToAdd() {
    this.newStock = true;
    this.stock = new StockModel();
    this.displayDialog = true;
  }



  cloneCar(c: any): any {
    const user = {};
    // tslint:disable-next-line:forin
    for (const prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }

  // tslint:disable-next-line:typedef
  getStock() {
    this.stockService.getAllStock().subscribe(response => {
      this.listStock = response;
      this.listStock?.forEach(element => {
        element.nombre = this.listProducts.filter(x => x.value.productoId === element.productoId)[0]?.value.nombre;
        element.codigo = this.listProducts.filter(x => x.value.productoId === element.productoId)[0]?.value.codigo;
      });
    });
  }

  // tslint:disable-next-line:typedef
  getCatalogoProducts() {
    this.listProducts = [];
    this.productService.findAllProducts().subscribe(response => {
      response.forEach(element => {
        this.listProducts.push({ label: element.name + ' - ' + element.productoId, value: element });
      });
    });
  }


  validateStock(stock: any): boolean {
    if (stock.purchased !== undefined && stock.available !== undefined && stock.purchased !== null && stock.available !== null) {
      if (stock.purchased > stock.available) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }

  processStockData() {
    this.listStock?.forEach(element => {
      element.nombre = this.listProducts.filter(x => x.value.productoId === element.productoId)[0]?.value.nombre;
      element.codigo = this.listProducts.filter(x => x.value.productoId === element.productoId)[0]?.value.codigo;
    });
  }
}


