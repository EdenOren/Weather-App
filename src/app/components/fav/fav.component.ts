import { Component } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ModesService } from 'src/app/services/modes.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent {
  favorites: Array<{city: City}> = [];
  isCelsius!: boolean;

  constructor(
    private favService: FavoritesService,
    private mode: ModesService,
    private sbService: SnackbarService,
    ) {
    this.favorites = this.favService.getFavorites();
    this.isCelsius = this.mode.getTemp();
  }

  /**
   * remove city from favorites by given city
   * @param {City} city city to be removed
   */
  removeFavorite(city: City) {
    this.favService.removeFavorite(city);
    this.favorites = this.favService.getFavorites();
    this.sbService.sbSuccess(city.name + ' removed from your favorites');
  }
  /**
   * clear all favorites
   */
  removeAllFavorites() {
    this.favService.removeAllFavorites();
    this.favorites = [];
    this.sbService.sbSuccess('All favorites removed');
  }
}
