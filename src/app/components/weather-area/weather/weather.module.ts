import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { CurrentModule } from '../current/current.module';
import { ForecastModule } from '../forecast/forecast.module';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    CurrentModule,
    ForecastModule,
  ],
  exports: [WeatherComponent]
})
export class WeatherModule { }
