import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
  declarations: [ForecastComponent],
  imports: [
    CommonModule,
    PipesModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [ForecastComponent],
})
export class ForecastModule { }
