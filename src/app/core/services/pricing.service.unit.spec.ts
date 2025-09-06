import { PricingService } from './pricing.service';

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(() => {
    service = new PricingService();
  });

  it('applies SAVE10 correctly', () => {
    const result = service.compute({ subtotalCents: 10000, coupons: ['SAVE10'], region: 'EU' });
    expect(result.subtotal).toBe(9000);
    expect(result.discount).toBe(1000);
  });

  it('applies FREESHIP correctly', () => {
    const result = service.compute({ subtotalCents: 2000, coupons: ['FREESHIP'], region: 'US' });
    expect(result.shipping).toBe(0);
  });

  it('calculates tax based on region', () => {
    const eu = service.compute({ subtotalCents: 1000, coupons: [], region: 'EU' });
    const us = service.compute({ subtotalCents: 1000, coupons: [], region: 'US' });
    expect(eu.tax).toBeGreaterThan(us.tax);
  });
});
