import { NumberInput } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { FAVORITES } from '../app-consts';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  myFavorites:Array<{city: City}> = [];
  constructor() { }
  /**
   * get favorites array as city structure from local storage
   * @returns {Array{city:City}} return array of favorite cities, null otherwise
   */
  getFavorites(): Array<{city: City}> {
    const localItem = localStorage.getItem(FAVORITES);
    let favObj = localItem ? JSON.parse(localItem) : null;

    return (favObj);
  }
  /**
   * get favorites id by given city
   * @param {City} city city structure to search
   * @returns {number | null} return favorite id if city exists in favorites, null otherwise
   */
  getFavId(city: City): number | null {
    let res = null;
    
    this.getFavorites().forEach((element, i) => {
      if (element.city.key === city.key) { 
        res = i;
      }
    });
    
    return res;
  }
  /**
   * get city structure by given favorite id
   * @param {string} id favorite id to search for
   * @returns {City | null} return city structure, null if id not found
   */
  getFavCity(id: string | null): City | null {
    let favObj = this.getFavorites();
    let favId: number = id as unknown as number;
    let res!:City;
    
    if (favObj != null && favObj[favId]) {
      res = favObj[favId].city;
    }
    return res;
  }
  /**
   * add given city to favorites local storage
   * @param {numCityber} newCity city structure to add to favorites
   */
  addFavorite(newCity: City) {
    this.myFavorites = this.getFavorites() || [];

    this.myFavorites.push({city: newCity});
    localStorage.setItem(FAVORITES, JSON.stringify(this.myFavorites));
  }
  /**
   * remove given city from favorites local storage
   * @param {City} city city structure to remove from favorites
   */
  removeFavorite(city: City): void {
    this.myFavorites = this.getFavorites();
    
    let cityId = this.getFavId(city);
    if (cityId != null) {
      this.myFavorites.splice(cityId, 1);
    }
    localStorage.setItem(FAVORITES, JSON.stringify(this.myFavorites));
  }
  /**
   * remove favorites from local storage
   */
  removeAllFavorites() {
    localStorage.removeItem(FAVORITES);
  }

}
