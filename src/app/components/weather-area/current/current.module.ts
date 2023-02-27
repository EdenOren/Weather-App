import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current.component';

import { PipesModule } from '../../../pipes/pipes.module';
import { DateUpdatePipe } from 'src/app/pipes/dateUpdate';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CurrentComponent, DateUpdatePipe],
  imports: [
    CommonModule,
    PipesModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [CurrentComponent],
  providers: [],
})
export class CurrentModule { }
