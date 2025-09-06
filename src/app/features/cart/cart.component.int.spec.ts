// src/app/features/cart/cart.component.int.spec.ts
import { render, screen, fireEvent } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartStore } from '../../core/store/cart.store';
import { PricingService } from '../../core/services/pricing.service';

describe('CartComponent (integration)', () => {
  it('applies coupon and updates totals', async () => {
    const { fixture } = await render(CartComponent, {
      providers: [CartStore, PricingService],
    });

    const store = TestBed.inject(CartStore);
    store.add({ id: 'p-1', name: 'Test Product', priceCents: 10000, stock: 5 }, 1);
    fixture.detectChanges();

    const input = screen.getByPlaceholderText(/SAVE10/i);
    fireEvent.input(input, { target: { value: 'SAVE10' } });
    fireEvent.click(screen.getByText(/Apply/i));

    expect(await screen.findByText(/Discount:/i)).toBeInTheDocument();
  });
});
