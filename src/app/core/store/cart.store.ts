import { Injectable, computed, signal } from '@angular/core';
import { CartLine, PricingBreakdown, Region } from '../models/cart';
import { Product } from '../models/product';
import { PricingService } from '../services/pricing.service';

@Injectable({ providedIn: 'root' })
export class CartStore {
  readonly items = signal<CartLine[]>([]);
  readonly coupons = signal<string[]>([]);
  readonly region = signal<Region>('EU');

  constructor(private pricing: PricingService) {}

  add(product: Product, qty = 1) {
    this.items.update(lines => {
      const idx = lines.findIndex(l => l.product.id === product.id);
      if (idx >= 0) {
        const newQty = Math.min(product.stock, lines[idx].qty + qty);
        const updated = [...lines];
        updated[idx] = { ...updated[idx], qty: newQty };
        return updated;
      }
      return [...lines, { product, qty: Math.min(qty, product.stock) }];
    });
  }

  setQty(productId: string, qty: number) {
    this.items.update(lines => lines.map(l =>
      l.product.id === productId ? { ...l, qty: Math.max(0, Math.min(qty, l.product.stock)) } : l
    ).filter(l => l.qty > 0));
  }

  remove(productId: string) {
    this.items.update(lines => lines.filter(l => l.product.id !== productId));
  }

  clear() {
    this.items.set([]);
    this.coupons.set([]);
  }

  applyCoupon(code: string) {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return;
    if (!this.coupons().includes(normalized)) {
      this.coupons.update(c => [...c, normalized]);
    }
  }

  removeCoupon(code: string) {
    const normalized = code.trim().toUpperCase();
    this.coupons.update(c => c.filter(x => x !== normalized));
  }

  setRegion(region: Region) {
    this.region.set(region);
  }

  subtotal = computed(() =>
    this.items().reduce((sum, l) => sum + l.product.priceCents * l.qty, 0)
  );

  breakdown = computed<PricingBreakdown>(() =>
    this.pricing.compute({
      subtotalCents: this.subtotal(),
      coupons: this.coupons(),
      region: this.region()
    })
  );
}
