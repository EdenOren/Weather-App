import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { ForecastWeather } from 'src/app/models/weather.model';
import { CEL_UNIT_DISP, FAR_UNIT_DISP } from 'src/app/app-consts';
import { AppService } from 'src/app/services/app.service';
import { ModesService } from 'src/app/services/modes.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input() city!:City;
  
  isCelsius!: boolean;
  foreWeather:ForecastWeather[] = [];

  readonly FAR_UNIT_DISPLAY = FAR_UNIT_DISP;
  readonly CEL_UNIT_DISPLAY = CEL_UNIT_DISP;

  constructor(private appServ: AppService, private mode: ModesService) { }

  ngOnInit() {
    this.getWeathers();
  }
  /**
   * check user preference temperature unit 
   */
  ngAfterContentChecked() {
    this.isCelsius = this.mode.getTemp();
  }

  /**
   * get and set forecast weather 
   */
  getWeathers() {
    this.get5DaysWeather()
    .then((res) =>{
      this.set5DaysWeather(res);
    })
  }

  /**
   * get 5 day forecast weather from api 
   * @return {Promise} data from api
   */
  async get5DaysWeather(): Promise<any> {
    try{
      const res = this.appServ.get5DaysForecasts(this.city.key);
      return await firstValueFrom(res);
    } catch (err) {
      return err;
    }
  }
  /**
   * set 5 day forecast weather to local variable 
   * @param {any} data given weather data to set
   */
  set5DaysWeather(data:any) {
    let forecasts = data.DailyForecasts;
    for (let i = 0; i < forecasts.length; i++) {
      this.foreWeather[i] = new ForecastWeather(forecasts[i]); 
    }
  }
}

