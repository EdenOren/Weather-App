import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './error.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';

//mat modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    //mat modules
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true}],
  bootstrap: [LayoutComponent]
})
export class AppModule {}