import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { CurrentWeather } from 'src/app/models/weather.model';
import { FavoritesService } from 'src/app/services/favorites.service';
import { AppService } from 'src/app/services/app.service';
import { ModesService } from 'src/app/services/modes.service';
import { CEL_UNIT_DISP, FAR_UNIT_DISP } from 'src/app/app-consts';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent {
  @Input() city!:City;
  @Input() id!:number; // id -1: show add to favorites option. else show city favorite id.
  
  isCelsius!: boolean;
  currWeather$!: Observable<CurrentWeather>;

  readonly FAR_UNIT = FAR_UNIT_DISP;
  readonly CEL_UNIT = CEL_UNIT_DISP;

  constructor(
    private favService: FavoritesService,
    private sbService: SnackbarService,
    private appServ: AppService,
    private mode: ModesService
  ) { }

  /**
   * check and update temperature unit
   */
  ngOnInit() {
    this.getWeathers();
  }
  ngOnChanges() {
    if (typeof this.city != 'undefined' ) {
      this.city.isFav = (this.favService.getFavId(this.city) != null)? true : false;
    }
  }
  /**
   * check and update temperature unit
   */
  ngAfterContentChecked() {
    this.isCelsius = this.mode.getTemp();
  }
  /**
   * get current weather conditions by city key
   * to observable
   */
  getWeathers() {
    this.currWeather$ = this.appServ.getCurrentConditions(this.city.key);
  }
  /**
   * add / remove city form favorites 
   * @param {City} city city to be added or removed
   */
  toggleFav(city: City):void {
    if (this.city != null) {
      if (city.key === this.city.key) {
        city.isFav = !city.isFav;
        if (city.isFav) {
          this.favService.addFavorite(city);
          this.sbService.sbSuccess(city.name + ' added to your favorites');
        } else {
          this.favService.removeFavorite(city);
          this.sbService.sbSuccess(city.name + ' removed from your favorites');
        }
      }
    }
  }
}

