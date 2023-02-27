import { Component} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import { City } from "src/app/models/city.model";
import { AppService } from "src/app/services/app.service";
import { MIN_INPUT_CITY_NAME, DEFAULT_LAT, DEFAULT_LNG, TIMEOUT_LOCATION, DEBOUNCE_TIME_AUTO_COMPLETE } from "src/app/app-consts";
import { FavoritesService } from "src/app/services/favorites.service";
import { _isNumberValue } from "@angular/cdk/coercion";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  matchHighlight: string = '';  //matching text to hightlight on drop-down
  searchedCity!: City;          // selected city from dropdown
  favCity!: City;               // selected fav city by id / favorite page

  inputValue!: string;          
  inputSearch: FormControl = new FormControl('', {nonNullable: true});
  
  filterCities$!: Observable<any>;
  currentLocation$!: Observable<City>;
  selectCity!: City | null; //chosen city to display weather data, if selected

  constructor(
    private appServ: AppService,
    private favService: FavoritesService,
    private router: Router,
    private activeRoute:ActivatedRoute
  ) { };

  ngOnInit() {
    this.getCurrentLocation();
    this.filterCities();
    this.setShowCityWeather();
  }

  setShowCityWeather() {
    this.activeRoute.paramMap.subscribe((params) => {
      const routeId = params.get('id');
      if (_isNumberValue(routeId)) {
        let isValidFav = this.favService.getFavCity(routeId);
        if (isValidFav) { // show favorite city
          this.selectCity = isValidFav;
        } else { //favorite id not found
          this.changeRoute('page404');
        }
      } else if (this.inputSearch.value != '') { //show city by input
        this.selectCity = this.searchedCity;        
      } else { //show city by default (location)
        this.selectCity = null;
      }
    });  
  }
  /**
   * create Observable with filtered cities from api by given search term
   * to populate dropdown
   */
  filterCities() {
    this.filterCities$ = this.inputSearch.valueChanges.pipe(
      filter((value) => value.length > MIN_INPUT_CITY_NAME),
      debounceTime(DEBOUNCE_TIME_AUTO_COMPLETE),
      distinctUntilChanged(),
      switchMap((value) => {
        this.matchHighlight = value; //update highlight to matching text
        return this.appServ.getAutoComplete(value);
      })
    )
  }
  
  /**
   * get user location coordinates from geolocation service
   * if geolocation service fails or is not available, use default coordinates
   * create Observable with location coordinates
   */
  async getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.currentLocation$ = this.appServ.getLocation(latitude, longitude);
        }, () => { //geolocation failed, set default coordinates
          this.currentLocation$ = this.appServ.getLocation(DEFAULT_LAT, DEFAULT_LNG);
        }, { //options
          enableHighAccuracy: true,
          timeout: TIMEOUT_LOCATION,
          maximumAge: Infinity
        });
    } else { //no geolocation found, set default coordinates
      this.currentLocation$ = this.appServ.getLocation(DEFAULT_LAT, DEFAULT_LNG);
    }
  }
  /**
   * navigate to given route address
   * @param {string} route given route address
   */
  changeRoute(route: string) {
    if (this.router.url != route) {
      this.router.navigate(['/' + route]);
    }
  }
  /**
   * set and display selected city from dropdown selection
   */
  displaySelected() {
    this.searchedCity = new City(this.inputSearch.value);
    this.matchHighlight = this.searchedCity.name;
    this.inputValue = this.displayAuto(this.searchedCity);
    this.setShowCityWeather();
  }

  /**
   * display city name in autocomplete dropdown
   * @param {City} city to display
   */
  displayAuto(city: City):string {
    return (city && city.name && city.country) ? city.name + ', ' + city.country : '';
  }

}
