import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from './temperature.pipe';
import { WeatherIconPipe } from './weatherIcon.pipe';

@NgModule({
  declarations: [TemperaturePipe, WeatherIconPipe],
  imports: [CommonModule],
  exports: [TemperaturePipe, WeatherIconPipe]
})
export class PipesModule { }
