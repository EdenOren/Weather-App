import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { ForecastWeather } from 'src/app/models/weather.model';
import { CEL_UNIT_DISP, FAR_UNIT_DISP, FORECAST_DAYS } from 'src/app/app-consts';
import { AppService } from 'src/app/services/app.service';
import { ModesService } from 'src/app/services/modes.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input() city!:City;
  
  isCelsius!: boolean;
  hasLoaded!: boolean;
  forecast$!: Observable<ForecastWeather>;
  foreWeather:ForecastWeather[] = []; // each element represents forecsat for the next 5 days

  readonly FAR_UNIT = FAR_UNIT_DISP;
  readonly CEL_UNIT = CEL_UNIT_DISP;

  constructor(private appServ: AppService, private mode: ModesService) { }

  ngOnInit() {
    this.hasLoaded = false;
  }
  ngOnChanges() {
    if (typeof this.city != 'undefined' ) {
      this.getWeathers();
    }
  }
  ngAfterContentChecked() {
    this.isCelsius = this.mode.getTemp();
  }
  getWeathers() {
    this.forecast$ = this.appServ.get5DaysForecasts(this.city.key);
    
    this.get5DaysWeather()
    .then((res) =>{
      this.set5DaysWeather(res);
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  async get5DaysWeather(): Promise<any> {
    try{
      const res = this.appServ.get5DaysForecasts(this.city.key);
      return await firstValueFrom(res);
    } catch (err) {
      return err;
    }
  }
// 
  set5DaysWeather(data:any) {
    for (let i = 0; i < FORECAST_DAYS; i++) {
      this.foreWeather[i] = new ForecastWeather(data.DailyForecasts[i]); 
    }
    this.hasLoaded = true;
  }
}

