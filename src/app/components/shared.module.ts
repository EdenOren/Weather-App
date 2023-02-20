import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastModule } from './weather-area/forecast/forecast.module';
import { CurrentModule } from './weather-area/current/current.module';
import { WeatherModule } from './weather-area/weather/weather.module';

@NgModule({
  imports: [CommonModule, WeatherModule, ForecastModule, CurrentModule],
  exports: [WeatherModule, ForecastModule, CurrentModule],
  declarations: [],
})
export class SharedModule { }
