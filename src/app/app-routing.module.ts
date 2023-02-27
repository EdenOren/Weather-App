import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  { path: "home", loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  { path: "fav", loadChildren: () => import('./components/fav/fav.module').then(m => m.FavModule)},
  { path: "page404", component: Page404Component},
  { path: "**", pathMatch: "full", redirectTo: "home"},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
