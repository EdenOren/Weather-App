import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavRoutingModule } from './fav.routing.module';
import { FavComponent } from './fav.component';
import { SharedModule } from '../shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FavComponent],
  imports: [
    CommonModule,
    FavRoutingModule,
    SharedModule,
    
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [],
})
export class FavModule { }