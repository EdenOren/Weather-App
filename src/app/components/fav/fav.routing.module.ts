import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavComponent } from './fav.component';

const routes = [{ path: '', component: FavComponent }]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule],
})
export class FavRoutingModule { }