import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/interface/generic.services';
import { ConfigService } from 'src/app/services/interface/config.services';
import { Message, MessageService } from 'primeng';
import { UserModel } from 'src/app/services/models/user.model';
import { PagesComponent } from '../pages.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: any = {};
  result: any;
  msgs: Message[];
  constructor(public router: Router, public userService: ConfigService, public messageServices: MessageService,
              public userModel: UserModel ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.userModel.loginOk = false;
  }

  // tslint:disable-next-line: typedef
  ingresar(user: any) {
    this.userService.login(user).subscribe((response: any) => {
      this.result = response;
      if (response.code === 200) {
        this.userModel.loginOk = true;
        this.userModel.tipo = response.data.tipo;
        this.router.navigate(['/invoices']);
      } else {
        this.messageServices.addAll([{ severity: 'info', summary: 'Usuario o contraseña incorrectos' }]);
      }
    }, (err) => {
      this.messageServices.addAll([{ severity: 'info', summary: 'Usuario o contraseña incorrectos' }]);
    });
  }

}
