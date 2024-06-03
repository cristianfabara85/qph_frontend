import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GenericService } from './generic.services';
import { URL } from '../../common/url.services';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private _genericService: GenericService) { }

  url = URL;

  public findAllProducts(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_PRODUCT}${this.url.PRODUCTS.FIND_ALL}`, null, null);
  }

  public getProductById(id: any): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_PRODUCT}${this.url.PRODUCTS.GET_BY_ID}/${id}`, null, null);
  }

  public saveProducts(obj: any): Observable<any> {
    return  this._genericService.genericCallServices('post', `${this.url.CONTEXT}${this.url.CONTEXT_PRODUCT}${this.url.PRODUCTS.SAVE}`, obj, null);
  }

  public deleteProducts(id: any): Observable<any> {
    return  this._genericService.genericCallServices('delete', `${this.url.CONTEXT}${this.url.CONTEXT_PRODUCT}${this.url.PRODUCTS.DELETE}/${id}`, null , null);
  }

}
