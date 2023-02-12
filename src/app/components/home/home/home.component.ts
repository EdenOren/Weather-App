import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { lastValueFrom, Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from "rxjs/operators";
import { City } from "src/app/models/city.model";
import { AppService } from "src/app/services/app.service";
import { MIN_INPUT_CITY_NAME, DEFAULT_LAT, DEFAULT_LNG, TIMEOUT_LOCATION, DEBOUNCE_TIME_AUTO_COMPLETE } from "src/app/app-consts";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy{
  filteredCities: Observable<any[]> = new Observable<any[]>
  inputSearch: FormControl = new FormControl('', {nonNullable: true});
  noteLeave = new Subject();

  minInput: number = MIN_INPUT_CITY_NAME; //min required chars to make api call
  inputValue: string = '';      //value inserted to input
  matchHighlight: string = '';  //matching text to hightlight drop-down
  selection!: City;             //selected city

  constructor(private appServ: AppService) { };

  ngOnInit() {
    this.getCurrentLocation();
    this.filterCities();
  }
  ngOnDestroy() {
    this.noteLeave.complete() // clear observable
}
  //filter city names auto-complete
  filterCities() {
    this.filteredCities = this.inputSearch.valueChanges.pipe(
      filter((value) => value.length > this.minInput),
      debounceTime(DEBOUNCE_TIME_AUTO_COMPLETE),
      distinctUntilChanged(),
      takeUntil(this.noteLeave),
      switchMap((value) => {
        this.matchHighlight = value; //update highlight to matching text
        return this.appServ.getAutoComplete(value);
      })
    )
  }

  //get current user location for initial weather view
  async getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        this.promToSet(this.getLocation(latitude, longitude));
      }, //geolocation failed, set default
        () => {this.promToSet(this.getLocation(DEFAULT_LAT, DEFAULT_LNG));},
      {
        enableHighAccuracy: true,
        timeout: TIMEOUT_LOCATION,
        maximumAge: Infinity
      });
    } else { //no geolocation found, set default
      this.promToSet(this.getLocation(DEFAULT_LAT, DEFAULT_LNG));
    }
  }
  // convert promise to set data selecton
  promToSet(promise: Promise<any>) {
    promise.then((data) =>{ this.setSelection(data);})
    .catch((err) =>{err}); 
  }

  // call get location service
  async getLocation(lati:number, long:number): Promise<any>{
    try{
      const res = this.appServ.getLocation(lati, long);
      return await lastValueFrom(res);
    } catch (err) {
      console.log(err);
    }
  }

  //set selected location
  private setSelection(data: any) {
    this.selection = new City(
      data.ParentCity.Key,
      data.ParentCity.LocalizedName,
      data.Country.LocalizedName
    );
    if (!localStorage.getItem('user-location')) {
      localStorage.setItem('user-location',JSON.stringify(this.selection));
    }
  }

  // get selection data
  onSelected() {
    this.selection = {
      key: this.inputSearch.value.Key,
      name: this.inputSearch.value.LocalizedName,
      country: this.inputSearch.value.Country.LocalizedName,
      isFav: false
    }
    this.matchHighlight = this.selection.name; //set  to selection
    this.inputValue = this.displayAuto(this.selection);
  }

  // city format
  displayAuto(city: City):string {
    return (city && city.name && city.country) ? city.name + ', ' + city.country : '';
  }

  getUserLocation(): string | null {
    let data = localStorage.getItem('user-location');
    if (data) {
      return JSON.parse(data).name + ', ' + JSON.parse(data).country;
    }
    return null;
  }
}
