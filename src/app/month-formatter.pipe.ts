import { Pipe, PipeTransform } from '@angular/core';

const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];

@Pipe({
  name: 'monthFormatter'
})
export class MonthFormatterPipe implements PipeTransform {

  transform(value: number): string {
    return monthNames[value - 1];
  }

}
