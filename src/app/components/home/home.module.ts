import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from 'src/app/pipes/highlight.pipe';

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FocusDirective } from 'src/app/directives/focus.directive';

@NgModule({
  declarations: [HomeComponent, HighlightPipe, FocusDirective],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [],
})
export class HomeModule { }