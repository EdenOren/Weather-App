import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes = [{ path: '', component: HomeComponent },
                { path: ':id', component: HomeComponent }]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule],
})
export class HomeRoutingModule { }