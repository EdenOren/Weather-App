import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent{
  @Input() selectedCity!: City | null; //given city to show
  @Input() currentLocation!: City | null; //current location

  showCity!: City | null;  //city to display 

  ngOnChanges():void {
    this.setActiveCity();
  }
  /**
   * set city to display
   */
  setActiveCity():void {
    if (this.selectedCity) {
      this.showCity = this.selectedCity;
    } else {
      this.showCity = this.currentLocation;
    }
  }
}