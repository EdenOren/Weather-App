import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { CurrentModule } from '../current/current.module';
import { ForecastModule } from '../forecast/forecast.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    CurrentModule,
    ForecastModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [WeatherComponent]
})
export class WeatherModule { }
