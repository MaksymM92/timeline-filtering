import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTime'
})
export class FilterTimePipe implements PipeTransform {

  transform(items: any[], tsMin: number, tsMax: number): any {
    if (!items || !tsMin || !tsMax) {
      return items;
    }
    return items.filter(item => item.time > tsMin && item.time < tsMax);
  }
}
