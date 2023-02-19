import { Component, OnInit } from '@angular/core';
import { FAR_UNIT_DISP, CEL_UNIT_DISP } from 'src/app/app-consts';
import { ModesService } from 'src/app/services/modes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{
  public logo= 'assets/images/logo.png';
  public title= 'The Weather App';

  public isLight!: boolean;    //true represent dark theme, else light theme
  public isCelsius!: boolean; //true represent celsius scale temperature view, else fahrenheit scale 

  readonly FAR_UNIT = FAR_UNIT_DISP;
  readonly CEL_UNIT = CEL_UNIT_DISP;
  constructor(private mode:ModesService) { }

  ngOnInit() {
    this.getUserThemeMode();
    this.toggleTheme();
    
    this.getUserTempMode();
  }

  //get user theme mode preference
  getUserTempMode() {
    this.isCelsius = this.mode.getTemp();
  }
  //toggle temperature mode 
  toggleTempMode() {
    this.isCelsius = !this.isCelsius;
    this.toggleTemp();
  }
  // change temp view fahrenheit/ celsius
  toggleTemp() {
    this.mode.setTemp(this.isCelsius);
  }

  //get user theme mode preference
  getUserThemeMode() {
    this.isLight = this.mode.getTheme();
  }
  //toggle light/dark mode 
  toggleDarkMode() {
    this.isLight = !this.isLight;
    this.toggleTheme();
  }
  // change theme according to light/dark mode
  toggleTheme() {
    const themeStr = this.mode.setTheme(this.isLight);
    document.documentElement.setAttribute('data-theme', themeStr);
  }
}
