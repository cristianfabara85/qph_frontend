import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/interface/config.services';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  constructor( public configService: ConfigService) {
  }

  displayDialog: boolean;

    user: any = {};
    selectType: any = {};
    selectedCar: any;
    newUser: boolean;
    typeUsers: any[];
    listUsers: any[];
    cols: any[];

// tslint:disable-next-line:typedef
ngOnInit() {

  this.displayDialog = false;
  this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'usuario', header: 'usuario' },
      { field: 'correo', header: 'Correo' },
      { field: 'tipo', header: 'Tipo' }
  ];

  this.typeUsers = [
    {
      label: 'Interno',
      value: 1
    },
    {
      label: 'Externo',
      value: 2
    }
  ];

  this.getUsers();
}

  // tslint:disable-next-line:typedef
  showDialogToAdd() {
    this.newUser = true;
    this.user = {};
    this.displayDialog = true;
  }

  // tslint:disable-next-line:typedef
  save() {
    const listUsers = [...this.listUsers];
    if (this.newUser) {
      this.user.tipo = this.selectType;
      this.configService.saveUser(this.user).subscribe(response => {
        this.getUsers();
        this.user = null;
        this.displayDialog = false;
      });
    }
    else {
      listUsers[this.listUsers.indexOf(this.selectedCar)] = this.user;
      this.configService.saveUser(this.user).subscribe(response => {
        this.getUsers();
        this.user = null;
        this.displayDialog = false;
      });
    }
  }

  // tslint:disable-next-line:typedef
  delete() {
  this.configService.deleteUser(this.user).subscribe(response => {
     this.getUsers();
     this.user = null;
     this.displayDialog = false;
   });

  }

  // tslint:disable-next-line:typedef
  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneCar(event.data);
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
  getUsers() {
    this.configService.findUser().subscribe(response => {
        this.listUsers = response;
      });
  }

}


