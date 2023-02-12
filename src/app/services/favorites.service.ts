import { Injectable } from '@angular/core';
import { FAVORITES } from '../app-consts';
import { City } from '../models/city.model';
import { CurrentWeather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  myFavorites:Array<{id: number, city: City}> = [];
  constructor() { }

  getFavorites(): Array<{id: number, city: City}> {
    const localItem = localStorage.getItem(FAVORITES);
    let favObj = localItem ? JSON.parse(localItem) : null;

    return (favObj);
  }
  getCityID(city: City): number | null {
    let favObj = this.getFavorites()
    let res = null;
    
    if (favObj != null) {
      favObj.forEach(e => {
        if (e.city.key === city.key) { 
          res = e.id;
        }
      });
    }
    return res;
  }
  isFavorite(city: City): boolean {
    if (this.getCityID(city) != null) {
      return true;
    }
    return false;
  }
  addFavorite(newCity: City) {
    this.myFavorites = this.getFavorites() || [];
    let setID = this.myFavorites.length;

    this.myFavorites.push({id: setID, city: newCity});
    localStorage.setItem(FAVORITES, JSON.stringify(this.myFavorites));
  }

  removeFavorite(city: City): void {
    this.myFavorites = this.getFavorites();
    
    let cityID = this.getCityID(city);
    if (cityID != null) {
      this.myFavorites.splice(cityID);
    }
    localStorage.setItem(FAVORITES, JSON.stringify(this.myFavorites));
  }

  removeAllFavorites() {
    localStorage.removeItem(FAVORITES);
  }

  getFavId(): number {
    if (this.getFavorites() != null) {
      return this.getFavorites().length;
    }
    return (0);
  }
}
