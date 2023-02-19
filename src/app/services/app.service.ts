import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY, URL_AUTOCOMPLETE, URL_CURRENT_WEATHER, URL_FORECAST_WEATHER, URL_LOCATION } from '../app-consts';
import { map, shareReplay } from 'rxjs/operators';
import { City } from '../models/city.model';
import { CurrentWeather, ForecastWeather } from '../models/weather.model';

/**
 * Interface for getRequest function to construct api url
 * @member {string} _url api url
 * @member {string} _q optional parameter for adding query to url
 * @member {string} _cityKey optional parameter for inserting city key to url
 */
export interface getRequestParams {
  _url: string;
  _q?: any;
  _cityKey?: any;
}

@Injectable({
  providedIn: 'root'
})

export class AppService{
  constructor(private http:HttpClient) { }

  /**
   * create get request with params, return data from api
   * @param {getRequestParams} reqPar - parameters for api call
   * @returns {Observable} return data from api
   */
  getRequest(reqPar: getRequestParams): Observable<Response> {
    //add query if exist
    const q = reqPar._q;
    const params = new HttpParams (q? {fromObject: {apikey: API_KEY, q}}:{fromObject: {apikey: API_KEY}});
      
    //add citykey if exist
    const cityKey = (reqPar._cityKey? reqPar._cityKey : ''); 
    
    return this.http.get<Response>(reqPar._url + cityKey, {params});
  }
  /**
   * get location data from api based on given coordinates
   * @param {number} latitude - desired location latitude
   * @param {number} longitude - desired location longitude
   * @returns {Observable} return location data
   */
  getLocation(latitude: number, longitude: number): Observable<City> {
    const url = URL_LOCATION;
    return this.getRequest({_url: url, _q: `${latitude},${longitude}`}).pipe(
      map((data)=> { return new City(data); })
    );
  }
  /**
   * get autocomplete cities from api based on given string
   * @param {string} str - text filter
   * @returns {Observable} return filtered cities
   */
  getAutoComplete(str: string): Observable<any> {
    const url = URL_AUTOCOMPLETE;
    return this.getRequest({_url: url, _q: `${str}`});
  }
  /**
   * get current weather conditions of city based on given city key
   * @param {number} key - city key
   * @returns {Observable} return current weather data
   */
  getCurrentConditions(key: number): Observable<CurrentWeather> {
    const url = URL_CURRENT_WEATHER;
    return this.getRequest({_url: url, _cityKey: `${key}`}).pipe(
      map((data)=> { return new CurrentWeather(data); })
    )
  }
  /**
   * get next 5 days weather conditions of city based on given city key
   * @param {number} key - city key
   * @returns {Observable} return next 5 days weather data
   */
  get5DaysForecasts(key: number): Observable<any> {
    const url = URL_FORECAST_WEATHER;
    return this.getRequest({_url: url, _cityKey: `${key}`});
  }
}