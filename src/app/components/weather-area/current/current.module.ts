import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current.component';

import { PipesModule } from '../../pipes.module';
import { DateUpdatePipe } from 'src/app/pipes/dateUpdate';

import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CurrentComponent, DateUpdatePipe],
  imports: [
    CommonModule,
    PipesModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  exports: [CurrentComponent],
})
export class CurrentModule { }
