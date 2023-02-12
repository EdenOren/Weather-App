  /**
   * get and set properties to and from local storage
   * theme and temperature unit
   */
import { Injectable } from '@angular/core';
import { CEL_UNIT, FAR_UNIT, DEFAULT_UNIT, DARK_THEME, DEFAULT_THEME, LIGHT_THEME } from '../app-consts';

@Injectable({
  providedIn: 'root'
})
export class ModesService {
  constructor() { }

  /**
   * check stored value and return accordingly
   * @param {string} storageName - A string param.
   * @param {string} defautlValue - An optional param (Google Closure syntax)
   * @returns {boolean} true if storageName value is default, false otherwise.
   */
  getServ(storageName: string, defautlValue: string): boolean{
    const localItem = localStorage.getItem(storageName);
    let current = localItem ? localItem : defautlValue;

    return (defautlValue.localeCompare(current) == 0);
  }
  
  /**
   * get user's preference temerature unit if exists, default unit otherwise
   * @returns {boolean} true if temerature unit is default, false otherwise.
   */
  getTemp(): boolean {
    return this.getServ('unit', DEFAULT_UNIT);
  }
  /**
   * get user's preference theme if exists, default theme otherwise
   * @returns {boolean} true if theme is default, false otherwise.
   */
  getTheme(): boolean {
    return this.getServ('theme', DEFAULT_THEME);
  }
  /**
   * set user's preference temerature unit in storage
   */
  setTemp(celsius_unit: boolean): void {
    const strSet = celsius_unit? CEL_UNIT : FAR_UNIT;
    localStorage.setItem('unit', strSet);
  }

  /**
   * set user's preference theme in storage
   */
  setTheme(light_mode: boolean): string {
    const strSet = light_mode? LIGHT_THEME : DARK_THEME;
    localStorage.setItem('theme', strSet);
    return strSet;
  }
}
