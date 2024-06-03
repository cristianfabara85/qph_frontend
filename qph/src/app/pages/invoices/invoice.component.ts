import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatalogService } from 'src/app/services/interface/catalog.services';
import { InvoiceService } from 'src/app/services/interface/invoice.services';
import { MessageService } from 'primeng/api';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.css']
})
export class InvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  listProducts: any[] = [];
  listClients: any[] = [];
  isGlobal: boolean = false;
  generatePdf: boolean = false;


  constructor(private fb: FormBuilder, private http: HttpClient,     private catalogService: CatalogService,private messageService: MessageService,private invoiceService: InvoiceService, private renderer: Renderer2) {
    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      documentId: [''],
      invoiceDate: [new Date(), Validators.required],
      items: this.fb.array([]),
      total: [{ value: 0, disabled: true }, Validators.required]
    });
  }

  ngOnInit() {
    this.isGlobal = false;
    this.generatePdf = false;
    forkJoin({
      clients: this.getCatalogoClients(),
      products: this.getCatalogoProducts()
    }).subscribe(result => {
      this.listClients = result.clients;
      this.listProducts = result.products;
       });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      product: ['', Validators.required],
      productId: [0, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{ value: 0, disabled: true }, Validators.required],
      subtotal: [{ value: 0, disabled: true }, Validators.required],
      tax: [{ value: 0, disabled: true }, Validators.required],
      total: [{ value: 0, disabled: true }, Validators.required]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateInvoiceTotal();
    
  }

  calculateTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value;
    const price = item.get('price')?.value;
    const subtotal = quantity * price;
    const total = quantity * price;
    const tax = (total*0.15);
    item.get('subtotal')?.setValue(subtotal);
    item.get('tax')?.setValue(tax);
    item.get('total')?.setValue(subtotal+tax);
    this.updateInvoiceTotal();
  }
  
  updateInvoiceTotal() {
    const total = this.items.controls.reduce((sum, item) => {
      return sum + item.get('total')?.value;
    }, 0);
    this.invoiceForm.get('total')?.setValue(total);
  }

  onProductChange(index: number) {
    const productId = this.items.at(index).get('product')?.value;
    const product = this.listProducts.find(p => p.value.codigo === productId);
    if (product) {
      this.items.at(index).get('price')?.setValue(product.value.precioUnidad);
      this.items.at(index).get('productId')?.setValue(product.value.productoId);
      this.calculateTotal(index);
    }
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const invoice = this.invoiceForm.getRawValue();
      this.invoiceService.saveInvoice(invoice).subscribe(response => {
        this.messageService.addAll([{ severity: 'success', summary:  `Factura Nro: ${response.id} generada correctamente` }]);
        this.cleanPage();


      });
    }
  }

  getCatalogoClients(): Observable<any> {
    return this.catalogService.findCatalogByType(2).pipe(
      map(response => {
        return response.map(element => ({ label: element.nombre, value: element }));
      })
    );
  }

  getCatalogoProducts(): Observable<any> {
    return this.catalogService.findAllCatalogProducts().pipe(
      map(response => {
        return response.map(element => ({ label: element.nombre, value: element }));
      })
    );
  }

onClientChange() {
  const clientId = Number(this.invoiceForm.get('clientId').value);
  const selectedClient = this.listClients.find(client => client.value.catalogoId === clientId);
  if (selectedClient) {
    this.invoiceForm.get('documentId').setValue(selectedClient.value.documentoId);
  } 
}

cleanPage() {
  this.invoiceForm = this.fb.group({
    clientId: ['', Validators.required],
    documentId: [''],
    invoiceDate: [new Date(), Validators.required],
    items: this.fb.array([]),
    total: [{ value: 0, disabled: true }, Validators.required]
  });
}



}