import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent{
  @Input() inputCity!: City; //given city from input
  routeCity!: City | null;  //given city from route
  showCity!: City;  //city to show - routeCity if valid, inputCity otherwise

  cityNotFound: boolean = false; //given routeId exists, but city not found, equals true, false otherwise

  constructor(private myActivatedRoute:ActivatedRoute, private favService: FavoritesService) { }

  ngOnInit() {
    this.myActivatedRoute.paramMap.subscribe((params) => {
      const routeId = params.get('id');
      this.routeCity = this.favService.getFavCity(routeId);
      if (routeId != null && this.routeCity === undefined) { // if given routeid exist and city not found
        this.cityNotFound = true;
      } else {
        this.cityNotFound = false;
      }
    });  
    this.setActiveCity();
  }
  ngOnChanges(){
    this.setActiveCity();
  }

  setActiveCity() {
    this.showCity = this.routeCity? this.routeCity : this.inputCity;
  }
  toggleFav(city: City) {
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