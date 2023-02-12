import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent{
  @Input() showCity!: City;

}