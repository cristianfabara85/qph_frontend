import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class GenericService {

// tslint:disable-next-line:variable-name
constructor(public router: Router, public _http: HttpClient) { }

public genericCallServices(methodoHttpType, url: string, body: any, additionalParameters: any): Observable<any> {
  let result;
  if (methodoHttpType === 'get' || methodoHttpType === 'delete' ) {
    return this._http[methodoHttpType](url).pipe(
        map((res: Response) => {
            result = res;
            return result;
        }), catchError( this.handleError ));
  } else if (methodoHttpType === 'post' || methodoHttpType === 'put' ) {
      return this._http[methodoHttpType](url, body).pipe(
        map((res: Response) => {
              result = res;
              return result;
        }), catchError( this.handleError )

        );
      }
  }

  private handleError(resp: HttpErrorResponse): any {
        let errMessage: any;
        try {
            if (resp.error.code === 701) {
                errMessage = resp.error.message;
                localStorage.removeItem('token');
                localStorage.removeItem('acceso');
                window.location.href = '/#/login';
            }  else {
                errMessage =  undefined !== resp.error.message ? resp.error.message : 'Servicio no disponible';
            }
        } catch (err) {
            errMessage = undefined !== resp.error.message ? resp.error.message : 'Servicio no disponible';
        }
        return throwError(errMessage);
    }
}
