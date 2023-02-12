import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <div class="container">
    <header><app-header></app-header></header>
    <main><router-outlet></router-outlet></main>
  </div>`,
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {

}
