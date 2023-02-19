import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "home", loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  { path: "fav", loadChildren: () => import('./components/fav/fav.module').then(m => m.FavModule)},
  { path: "**", pathMatch: "full", redirectTo: "home"},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
