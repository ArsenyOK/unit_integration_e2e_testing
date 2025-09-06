import { Pipe, PipeTransform } from '@angular/core';
import { Region } from '../../core/models/cart';

@Pipe({ name: 'money', standalone: true })
export class MoneyPipe implements PipeTransform {
  transform(cents: number, region: Region): string {
    const currency = region === 'EU' ? 'EUR' : region === 'US' ? 'USD' : 'UAH';
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(cents / 100);
  }
}
