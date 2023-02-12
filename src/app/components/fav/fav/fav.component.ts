import { Component } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { FavoritesService } from 'src/app/services/favorites.service'
import { ModesService } from 'src/app/services/modes.service'

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent {
  favorites: Array<{id: number, city: City}> = [];
  isCelsius!: boolean;

  constructor(private favService: FavoritesService, private mode: ModesService) {
    this.favorites = this.favService.getFavorites();
    this.isCelsius = this.mode.getTemp();
  }
  removeFavorites() {
    this.favService.removeAllFavorites();
    this.favorites = [];
  }
}
