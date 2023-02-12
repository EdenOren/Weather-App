import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FavComponent } from './components/fav/fav/fav.component';
import { HomeComponent } from './components/home/home/home.component';
import { WeatherComponent } from './components/weather/weather/weather.component';
import { CurrentComponent } from './components/weather/current/current.component';
import { ForecastComponent } from './components/weather/forecast/forecast.component';

import { DatePipe } from '@angular/common';
import { HighlightPipe } from './pipes/highlight.pipe';
import { WeatherIconPipe } from './pipes/weatherIcon.pipe';
import { TemperaturePipe } from './pipes/temperature.pipe';

//mat modules
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FavComponent,
    HomeComponent,
    WeatherComponent,
    HighlightPipe,
    WeatherIconPipe,
    TemperaturePipe,
    CurrentComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    //mat modules
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [DatePipe],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
