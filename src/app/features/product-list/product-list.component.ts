import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { CartStore } from '../../core/store/cart.store';
import { MoneyPipe } from '../../shared/pipes/money.pipe';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [NgFor, NgIf, AsyncPipe, MoneyPipe, RouterLink],
  template: `
  <h1>Products</h1>
  <a routerLink="/cart">Go to Cart →</a>

  <div class="grid" *ngIf="products$ | async as products">
    <div class="card" *ngFor="let p of products">
      <div class="title">{{ p.name }}</div>
      <div class="price">{{ p.priceCents | money:region() }}</div>
      <div class="stock">Stock: {{ p.stock }}</div>
      <button (click)="add(p)" [disabled]="p.stock === 0">Add to cart</button>
    </div>
  </div>
  `,
  styles: [`
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
    .card{border:1px solid #e5e7eb;padding:12px;border-radius:12px}
    .title{font-weight:600;margin-bottom:4px}
    .price{margin:6px 0}
    button{padding:8px 12px;border:1px solid #111;border-radius:8px;background:#111;color:#fff;cursor:pointer}
    button[disabled]{opacity:.5;cursor:not-allowed}
  `]
})
export class ProductListComponent {
  private readonly products = inject(ProductsService);
  private readonly cart = inject(CartStore);

  products$: Observable<Product[]> = this.products.getAll();
  region = () => this.cart.region();

  add(p: Product) {
    this.cart.add(p, 1);
  }
}
