import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value? '₦ '+value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
  }

}
