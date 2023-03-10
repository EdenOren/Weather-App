import { Pipe, PipeTransform } from '@angular/core';
import { FAR_UNIT_DISP, CEL_UNIT_DISP } from '../app-consts';
/**
 * This pipe is used to convert celsius to fahrenheit and vice versa
 * @param {number} v value to be converted
 * @param {string} u unit of desired value
 * @returns {number} the temerature value in given unit
 */
@Pipe({
 name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  transform(v: number, u: string): string | undefined {
    {
      if(v && !isNaN(v)){
        if(u === CEL_UNIT_DISP){
          var temp = (v - 32) / 1.8 ;
          return temp.toFixed(1) + u;
        }
        if(u === FAR_UNIT_DISP){
          var temp = (v * 32) + 1.8 ;
          return temp.toFixed(1) + u;
        }
      }
      return;
    }
  }
}