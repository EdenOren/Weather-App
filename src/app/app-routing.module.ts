import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavComponent } from './components/fav/fav/fav.component';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "home/:id", component: HomeComponent },
  { path: "fav", component: FavComponent  },
  { path: "**", redirectTo: "home" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
