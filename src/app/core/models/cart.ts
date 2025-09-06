import { Product } from './product';

export interface CartLine {
  product: Product;
  qty: number;
}

export type Region = 'EU' | 'US' | 'UA';

export interface PricingInput {
  subtotalCents: number;
  coupons: string[];
  region: Region;
}

export interface PricingBreakdown {
  subtotal: number;  
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}
