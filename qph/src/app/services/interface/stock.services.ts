import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GenericService } from './generic.services';
import { URL } from '../../common/url.services';

@Injectable()
export class StockService {

  constructor(private http: HttpClient, private _genericService: GenericService) { }

  url = URL;

  public getAllStock(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_STOCK}${this.url.STOCK.FIND_ALL}`, null, null);
  }

  public findAvailableStockByProductId(productId: any): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_STOCK}${this.url.STOCK.AVAILABLE_STOCK_BY_PRODUCT}/${productId}`, null, null);
  }

}
