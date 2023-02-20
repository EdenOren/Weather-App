import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGE } from '../app-consts';


/**
 * This pipe is used to return img url for given icon value
 * @param {any} value icon number 
 * @returns {string} img url
 */
@Pipe({
  name: 'weatherIcon'
})

export class WeatherIconPipe implements PipeTransform {
  transform(value: any): any{
    //add leading 0 if value is single digit
    if (value<10){
      value = '0' + value;
    }
    return URL_IMAGE + value + '-s.png';
  }
}