import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GenericService } from './generic.services';
import { URL } from '../../common/url.services';

@Injectable()
export class CatalogService {

  constructor(private http: HttpClient, private _genericService: GenericService) { }

  url = URL;

  public getProductById(id: any): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_CATALOG}${this.url.CATALOG.GET_BY_ID}/${id}`, null, null);
  }

  public findAllCatalogs(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_CATALOG}${this.url.CATALOG.GET_CATALOG_All}`, null, null);
  }

  public findCatalogByType(type:number): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_CATALOG}${this.url.CATALOG.GET_CATALOG_BY_TYPE}/${type}`, null, null);
  }

  public findAllProducts(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_CATALOG}${this.url.CATALOG.GET_CATALOG_PRODUCT}`, null, null);
  }

  public findAllCatalogProducts(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_CATALOG}${this.url.CATALOG.GET_CATALOG_ALL_PRODUCT}`, null, null);
  }
}