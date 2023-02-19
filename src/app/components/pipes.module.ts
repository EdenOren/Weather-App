import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { WeatherIconPipe } from '../pipes/weatherIcon.pipe';

@NgModule({
  declarations: [TemperaturePipe, WeatherIconPipe],
  imports: [CommonModule],
  exports: [TemperaturePipe, WeatherIconPipe]
})
export class PipesModule { }
