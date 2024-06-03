import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GenericService } from './generic.services';
import { URL } from '../../common/url.services';

@Injectable()
export class InvoiceService {

  constructor(private http: HttpClient, private _genericService: GenericService) { }

  url = URL;

  public findAllInvoices(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_SALES}${this.url.SALES.FIND_ALL}`, null, null);
  }

  public getProductById(id: any): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_SALES}${this.url.SALES.GET_BY_ID}/${id}`, null, null);
  }

  public saveInvoice(obj: any): Observable<any> {
    return  this._genericService.genericCallServices('post', `${this.url.CONTEXT}${this.url.CONTEXT_SALES}${this.url.SALES.SAVE}`, obj, null);
  }
  
}
