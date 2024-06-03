import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GenericService } from './generic.services';
import { URL } from 'src/app/common/url.services';

@Injectable()
export class ConfigService {
  // tslint:disable-next-line:variable-name
  constructor(private http: HttpClient, private _genericService: GenericService) { }

  url = URL;

  public saveUser(obj: any): Observable<any> {
    return  this._genericService.genericCallServices('post', `${this.url.CONTEXT}${this.url.CONTEXT_USER}${this.url.USERS.SAVE}`, obj, null);
  }

  public findUser(): Observable<any> {
    return  this._genericService.genericCallServices('get', `${this.url.CONTEXT}${this.url.CONTEXT_USER}${this.url.USERS.FIND_ALL}`,null,  null);
  }

  public updateUser(obj: any): Observable<any> {
    return  this._genericService.genericCallServices('put', `${this.url}/users/${obj.iduser}`, obj, null);
  }

  public deleteUser(obj: any): Observable<any> {
    return  this._genericService.genericCallServices('delete', `${this.url}/users/${obj.iduser}`, null , null);
  }

  public login(obj: any): Observable<any> {
    return  this._genericService.genericCallServices('post', `${this.url.CONTEXT}${this.url.CONTEXT_USER}${this.url.USERS.LOGIN}`, obj, null);
  }

}
