import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CatalogService } from 'src/app/services/interface/catalog.services';
import { StockService } from 'src/app/services/interface/stock.services';
import { PurchaseService } from '../../services/interface/purchase.services';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchases.component.html',
  styles: []
})
export class PurchasesComponent implements OnInit {

  constructor(public purchaseService: PurchaseService, private stockService: StockService, private catalogService: CatalogService,
              private messageService: MessageService) {
  }

  displayDialog: boolean;

    purchase: any = {};
    selectProduct: any = {};
    selectProvider: any = {};
    newPurchase: boolean;
    listPurchase: any[];
    cols: any[];
    listProviders: any[];
    listProducts: any[];
    msgs: any[];
// tslint:disable-next-line:typedef
ngOnInit() {
  this.displayDialog = false;
  forkJoin({
    providers:this.getCatalogoProviders(),
    products:this.getCatalogoProducts()
  }).subscribe(result=>{
    this.listProviders=result.providers;
    this.listProducts=result.products;

    this.cols = [
        { field: 'codigo', header: 'Código Producto' },
        { field: 'nombre', header: 'Nombre Producto' },
        { field: 'proveedor', header: 'Proveedor' },
        { field: 'cantidad', header: 'Cantidad' },
        { field: 'precioUnitario', header: 'Precio' },
        { field: 'precioTotal', header: 'Precio Total' }
    ];
    this.getPurchase();

  });

}

  // tslint:disable-next-line:typedef
  showDialogToAdd() {
    this.newPurchase = true;
    this.purchase = {};
    this.displayDialog = true;
  }

  // tslint:disable-next-line:typedef
  save() {
      this.purchase.productoId = this.selectProduct.productoId;
      this.purchase.proveedor = this.selectProvider.nombre;
      this.purchase.cantidad = Number(this.purchase.cantidad ? this.purchase.cantidad : 0);
      this.purchase.precioUnitario = Number(this.purchase.precioUnitario ? this.purchase.precioUnitario : 0);
      this.purchase.codigo = this.selectProduct.codigo;
      this.purchase.precioTotal = Number((this.purchase.cantidad * this.purchase.precioUnitario).toFixed(2));

      this.purchaseService.savePurchase(this.purchase).subscribe(response => {
        this.messageService.addAll([{ severity: 'success', summary: 'Compra realizada correctamente' }]);
        this.getPurchase();
        this.purchase = null;
        this.displayDialog = false;
      });
  }

  // tslint:disable-next-line:typedef
  onRowSelect(event) {
    // this.getCatalogopurchases();
    this.newPurchase = false;
    this.purchase = this.cloneCar(event);
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
  getPurchase() {
    this.purchaseService.findAllPurchases().subscribe(response => {
        this.listPurchase = response;
        this.listPurchase?.forEach(element => {
          element.nombre = this.listProducts.filter(x => x.value.productoId === element.productoId)[0]?.value.nombre;
          element.codigo = this.listProducts.filter(x => x.value.productoId === element.productoId)[0]?.value.codigo;
        });
      });
  }

  // tslint:disable-next-line:typedef
  getCatalogoProviders():Observable<any> {
    this.listProviders = [];
    return this.catalogService.findCatalogByType(1).pipe(
      map(response => {
        return response.map(element => ({ label: element.nombre, value: element }));
      })
    );
  }

  getCatalogoProducts():Observable<any> {
    return this.catalogService.findAllCatalogProducts().pipe(
      map(response => {
        return response.map(element => ({ label: element.nombre, value: element }));
      })
    );
  }

}


