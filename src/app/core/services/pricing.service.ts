import { Injectable } from '@angular/core';
import { PricingBreakdown, PricingInput, Region } from '../models/cart';

@Injectable({ providedIn: 'root' })
export class PricingService {
  private taxRate(region: Region): number {
    switch (region) {
      case 'US': return 0.08;
      case 'EU': return 0.20;
      case 'UA': return 0.20;
    }
  }

  private baseShipping(subtotalAfterDiscount: number): number {
    return subtotalAfterDiscount >= 5000 ? 0 : 1000;
  }

  compute({ subtotalCents, coupons, region }: PricingInput): PricingBreakdown {
    const normalized = coupons.map(c => c.trim().toUpperCase());
    let discount = 0;
    if (normalized.includes('SAVE10')) {
      discount += Math.floor(subtotalCents * 0.10);
    }
    const subtotalAfterDiscount = Math.max(0, subtotalCents - discount);

    let shipping = this.baseShipping(subtotalAfterDiscount);
    if (normalized.includes('FREESHIP')) {
      shipping = 0;
    }

    const tax = Math.floor((subtotalAfterDiscount + shipping) * this.taxRate(region));
    const total = subtotalAfterDiscount + shipping + tax;

    return {
      subtotal: subtotalAfterDiscount,
      discount,
      shipping,
      tax,
      total,
    };
  }
}
