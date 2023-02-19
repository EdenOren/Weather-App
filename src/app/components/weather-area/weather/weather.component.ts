import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent{
  @Input() inputCity!: City; //given city from input
  @Input() currentLocation!: City | null; //current location

  favCity!: City | null;  //given city from route 
  showCity!: City;  //city to show - routeCity if valid, inputCity otherwise

  cityNotFound: boolean = false; //given routeId exists, but city not found, equals true, false otherwise

  constructor(private myActivatedRoute:ActivatedRoute, private favService: FavoritesService) { }

  ngOnInit():void {
    this.deterInput();
    this.setActiveCity();
  }
  ngOnChanges():void {
    this.setActiveCity();
  }
  /**
   * determines input city from input field or by url parameter
   */
  deterInput():void {
    this.myActivatedRoute.paramMap.subscribe((params) => {
      const routeId = params.get('id');
      this.favCity = this.favService.getFavCity(routeId);
      if (routeId != null && this.favCity === undefined) { // if given routeid exist and city not found
        this.cityNotFound = true;
      } else {
        this.cityNotFound = false;
      }
    });  
  }
  /**
   * set city to display, by priority:
   * 1 - url parameter exist -> city favorite found / not found
   * 2 - valid input city
   * 3 - default city by location (given in inputCity parameter)
   */
  setActiveCity():void {
    if (this.favCity) {
      this.showCity = this.favCity;
    } else if (this.inputCity) {
      this.showCity = this.inputCity;
    } else if (this.currentLocation) {
      this.showCity = this.currentLocation;
    }
  }
  
  /**
   * add / remove city form favorites 
   * @param {City} city city to be added or removed
   */
  toggleFav(city: City):void {
    if (city.key === this.showCity.key) {
      city.isFav = !city.isFav;
      if (city.isFav) {
        this.favService.addFavorite(city);
      } else {
        this.favService.removeFavorite(city);
      }
    }
  }
}