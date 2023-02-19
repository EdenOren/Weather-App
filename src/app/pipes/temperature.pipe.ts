import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
/**
 * This pipe is used to convert celsius to fahrenheit and vice versa
 * @param {number} v value to be converted
 * @param {string} u unit of desired value
 * @returns {number} the temerature value in given unit
 */
  transform(v: number, u: string): string | undefined {
    {
      if(v && !isNaN(v)){
        if(u === 'C'){
          var temp = (v - 32) / 1.8 ;
          return temp.toFixed(1);
        }
        if(u === 'F'){
          var temp = (v * 32) + 1.8 ;
          return temp.toFixed(1);
        }
      }
      return;
    }
  }
}