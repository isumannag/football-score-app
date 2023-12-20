import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopNavComponent } from './pages/top-nav/top-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StandingComponent } from './pages/standings/standings.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent
  ],
  imports: [BrowserModule, RouterModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
