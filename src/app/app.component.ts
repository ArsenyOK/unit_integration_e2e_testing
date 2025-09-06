import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartStore } from './core/store/cart.store';
import { MoneyPipe } from './shared/pipes/money.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MoneyPipe],
  template: `
  <header class="app-header">
    <a routerLink="/products" class="logo">Mini Shop</a>
    <nav>
      <a routerLink="/products">Products</a>
      <a routerLink="/cart">Cart ({{ count() }}) — {{ total() | money:region() }}</a>
    </nav>
  </header>
  <main class="container">
    <router-outlet />
  </main>
  `,
  styles: [`
    .app-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #e5e7eb}
    .logo{font-weight:700;text-decoration:none}
    nav a{margin-left:12px;text-decoration:none}
    .container{max-width:900px;margin:24px auto;padding:0 16px}
  `]
})
export class AppComponent {
  private readonly cart = inject(CartStore);
  count = computed(() => this.cart.items().reduce((a, i) => a + i.qty, 0));
  total = computed(() => this.cart.breakdown().total);
  region = computed(() => this.cart.region());
}
