import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CartStore } from '../../core/store/cart.store';
import { MoneyPipe } from '../../shared/pipes/money.pipe';
import { Region } from '../../core/models/cart';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgFor, NgIf, MoneyPipe],
  template: `
  <h1>Cart</h1>

  <div *ngIf="lines().length === 0" class="empty">Your cart is empty.</div>

  <table *ngIf="lines().length > 0" class="table">
    <thead>
      <tr><th>Product</th><th>Qty</th><th>Price</th><th>Line</th><th></th></tr>
    </thead>
    <tbody>
      <tr *ngFor="let l of lines()">
        <td>{{ l.product.name }}</td>
        <td>
          <button (click)="dec(l.product.id)">−</button>
          <span class="qty">{{ l.qty }}</span>
          <button (click)="inc(l.product.id, l.product.stock)">+</button>
          <small class="muted"> / {{ l.product.stock }}</small>
        </td>
        <td>{{ l.product.priceCents | money:region() }}</td>
        <td>{{ (l.product.priceCents * l.qty) | money:region() }}</td>
        <td><button class="ghost" (click)="remove(l.product.id)">Remove</button></td>
      </tr>
    </tbody>
  </table>

  <div class="panel" *ngIf="lines().length > 0">
    <div class="row">
      <label>Coupon:</label>
      <input #couponEl [value]="coupon()" (input)="coupon.set(couponEl.value)" placeholder="SAVE10 or FREESHIP"/>
      <button (click)="apply()">Apply</button>
      <div class="chips">
        <span class="chip" *ngFor="let c of coupons()">{{ c }}
          <button class="x" (click)="removeCoupon(c)">×</button>
        </span>
      </div>
    </div>

    <div class="row">
      <label>Region:</label>
      <select #regionEl [value]="region()" (change)="setRegion(regionEl.value)">
        <option value="EU">EU</option>
        <option value="US">US</option>
        <option value="UA">UA</option>
      </select>
    </div>

    <div class="totals">
      <div>Subtotal: <b>{{ breakdown().subtotal | money:region() }}</b></div>
      <div>Discount: <b>− {{ breakdown().discount | money:region() }}</b></div>
      <div>Shipping: <b>{{ breakdown().shipping | money:region() }}</b></div>
      <div>Tax: <b>{{ breakdown().tax | money:region() }}</b></div>
      <div class="grand">Total: <b>{{ breakdown().total | money:region() }}</b></div>
    </div>

    <button class="checkout" [disabled]="lines().length===0" (click)="checkout()">Checkout</button>
  </div>

  <!-- Сообщение вынесено за пределы панели, видно после очистки корзины -->
  <div *ngIf="message()" class="msg">{{ message() }}</div>
  `,
  styles: [`
    .table{width:100%;border-collapse:collapse;margin:16px 0}
    th,td{border-bottom:1px solid #e5e7eb;padding:8px}
    .qty{display:inline-block;width:24px;text-align:center}
    .muted{color:#6b7280;margin-left:6px}
    .ghost{background:transparent;border:1px solid #e5e7eb;padding:4px 8px;border-radius:8px;cursor:pointer}
    .panel{border:1px solid #e5e7eb;border-radius:12px;padding:12px;margin-top:16px}
    .row{display:flex;align-items:center;gap:8px;margin:8px 0}
    .chips{display:flex;gap:8px;flex-wrap:wrap}
    .chip{border:1px solid #e5e7eb;border-radius:999px;padding:4px 8px}
    .chip .x{background:transparent;border:none;margin-left:6px;cursor:pointer}
    .totals{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin:12px 0}
    .grand{font-size:1.1rem}
    .checkout{padding:10px 14px;border-radius:10px;border:1px solid #111;background:#111;color:#fff}
    .msg{margin-top:10px}
    .empty{color:#6b7280}
  `]
})
export class CartComponent {
  private readonly cart = inject(CartStore);

  lines = () => this.cart.items();
  coupons = () => this.cart.coupons();
  region = () => this.cart.region();
  breakdown = () => this.cart.breakdown();

  coupon = signal('');
  message = signal('');

  inc(id: string, stock: number) {
    const line = this.lines().find(l => l.product.id === id);
    const next = (line?.qty ?? 0) + 1;
    this.cart.setQty(id, Math.min(next, stock));
  }
  dec(id: string) {
    const line = this.lines().find(l => l.product.id === id);
    const next = Math.max(0, (line?.qty ?? 0) - 1);
    this.cart.setQty(id, next);
  }
  remove(id: string) {
    this.cart.remove(id);
  }

  apply() {
    const code = this.coupon().trim();
    if (code) {
      this.cart.applyCoupon(code);
      this.coupon.set('');
    }
  }
  removeCoupon(code: string) {
    this.cart.removeCoupon(code);
  }
  setRegion(r: string) {
    this.cart.setRegion(r as Region);
  }

  checkout() {
    this.cart.clear();
    this.message.set('Order placed successfully ✅');
    setTimeout(() => this.message.set(''), 3000);
  }
}
