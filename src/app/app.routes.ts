import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductListComponent, title: 'Products' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: '**', redirectTo: 'products' },
];
