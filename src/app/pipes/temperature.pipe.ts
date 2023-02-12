import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(v: number, u: string) {
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