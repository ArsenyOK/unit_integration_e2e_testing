
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { PRODUCTS } from './mock-data';

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  // GET /api/products
  if (req.url === '/api/products' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: PRODUCTS })).pipe(delay(200));
  }

  return next(req);
};
