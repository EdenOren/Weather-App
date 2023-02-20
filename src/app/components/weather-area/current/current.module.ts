import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current.component';

import { PipesModule } from '../../../pipes/pipes.module';
import { DateUpdatePipe } from 'src/app/pipes/dateUpdate';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CurrentComponent, DateUpdatePipe],
  imports: [
    CommonModule,
    PipesModule,
    MatDividerModule,
  ],
  exports: [CurrentComponent],
  providers: [],
})
export class CurrentModule { }
