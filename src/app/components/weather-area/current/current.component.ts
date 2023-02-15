import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { CurrentWeather } from 'src/app/models/weather.model';
import { FavoritesService } from 'src/app/services/favorites.service';
import { AppService } from 'src/app/services/app.service';
import { ModesService } from 'src/app/services/modes.service';
import { CEL_UNIT_DISP, FAR_UNIT_DISP } from 'src/app/app-consts';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent {
  @Input() city!:City;
  
  isCelsius!: boolean;
  hasLoaded!: boolean;
  currWeather:CurrentWeather = new CurrentWeather; // current weather object

  readonly FAR_UNIT = FAR_UNIT_DISP;
  readonly CEL_UNIT = CEL_UNIT_DISP;

  constructor(
    private favService: FavoritesService,
    private appServ: AppService,
    private mode: ModesService
  ) { }

  ngOnInit() {
    this.hasLoaded = false;
  }
  ngOnChanges() {
    if (typeof this.city != 'undefined' ) {
      this.getWeathers();
      this.city.isFav = (this.favService.getFavId(this.city) != null)? true : false;
    }
  }
  ngAfterContentChecked() {
    this.isCelsius = this.mode.getTemp();
  }

  getWeathers() {
    this.getCurrWeather()
    .then((res) =>{
      this.setCurrentWeather(res);
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  async getCurrWeather(): Promise<any> {
    try{
      const res = this.appServ.getCurrentConditions(this.city.key);
      return await firstValueFrom(res);
    } catch (err) {
      return err;
    }
  }
  setCurrentWeather(data:any) {
    let result = data[0];
    this.currWeather = {
      localTime: result.LocalObservationDateTime,
      icon: {
        url: result.WeatherIcon,
        text: result.WeatherText,
      },
      temperature: {
        metric: result.Temperature.Metric.Value,
        imperial: result.Temperature.Imperial.Value
      }
    }
    this.hasLoaded = true;
  }

}
