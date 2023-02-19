import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'dateUpdate'
})
export class DateUpdatePipe implements PipeTransform {
/**
 * This pipe is used to extract string date by format.
 * @param {string} date given full date as string
 * @param {string} format given date format
 * @returns {string} extracted format of given date
 */
  transform(date: string, format: string): string | undefined {
    if (format === 'D-M-Y') {
      return date.substring(0, 4) + '-' + date.substring(5, 7) + '-' + date.substring(8, 10);
    }
    if (format === 'H-M-Z') {
      return date.substring(11, 13) + ':' + date.substring(14, 16) + ' (GMT' + date.substring(19, 25) + ')';
    }
    return;
  }
}