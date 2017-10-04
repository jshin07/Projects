import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BicycleService } from './bicycle.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';
import { AuthComponent } from './auth/auth.component';
import { BikesComponent } from './bikes/bikes.component';
import { BikeComponent } from './bikes/bike/bike.component';
import { UpdateComponent } from './bikes/bike/update/update.component';
import { LogoffComponent } from './logoff/logoff.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseComponent,
    ListingsComponent,
    AuthComponent,
    BikesComponent,
    BikeComponent,
    UpdateComponent,
    LogoffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [BicycleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
