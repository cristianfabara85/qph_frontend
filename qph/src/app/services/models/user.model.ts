import { Injectable } from '@angular/core';

@Injectable()
export class UserModel {

    // tslint:disable-next-line: variable-name
    private _loginOk: any;
    // tslint:disable-next-line: variable-name
    private _tipo: any;

    // tslint:disable-next-line: typedef
    public get loginOk() {
        return this._loginOk;
    }
    public set loginOk(loginOk) {
        this._loginOk = loginOk;
    }
    // tslint:disable-next-line: typedef
    public get tipo() {
        return this._tipo;
    }
    public set tipo(tipo) {
        this._tipo = tipo;
    }

}

