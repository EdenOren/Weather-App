import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { CurrentWeather } from 'src/app/models/weather.model';
import { FavoritesService } from 'src/app/services/favorites.service';
import { AppService } from 'src/app/services/app.service';
import { ModesService } from 'src/app/services/modes.service';
import { CEL_UNIT_DISP, FAR_UNIT_DISP } from 'src/app/app-consts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent {
  @Input() city!:City;
  
  isCelsius!: boolean;
  currWeather$!: Observable<CurrentWeather>;

  readonly FAR_UNIT = FAR_UNIT_DISP;
  readonly CEL_UNIT = CEL_UNIT_DISP;

  constructor(
    private favService: FavoritesService,
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
}

