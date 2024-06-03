import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { ProductsComponent } from './products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { StockComponent } from './stock/stock.component';
import { UserComponent } from './user/user.component';
import { InvoiceComponent } from './invoices/invoice.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'users', component: UserComponent},
            { path: 'stock', component: StockComponent},
            { path: 'product', component: ProductsComponent},
            { path: 'purchases', component: PurchasesComponent},
            { path: 'invoices', component: InvoiceComponent},
            { path: 'login', component: LoginComponent},
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
