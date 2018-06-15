import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BikeResolver } from './services/bike.resolver.service';
import { BikeService } from './services/bike.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { BikesComponent } from './bikes/bikes.component';
import { HomeComponent } from './bikes/home/home.component';
import { NavComponent } from './bikes/nav/nav.component';
import { LoginComponent } from './bikes/home/login/login.component';
import { RegisterComponent } from './bikes/home/register/register.component';
import { DailyBikeComponent } from './bikes/home/daily-bike/daily-bike.component';
import { BikeListComponent } from './bikes/nav/bike-list/bike-list.component';
import { BikeNewComponent } from './bikes/nav/bike-new/bike-new.component';
import { BikeDetailsComponent } from './bikes/nav/bike-details/bike-details.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    BikesComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    DailyBikeComponent,
    BikeListComponent,
    BikeNewComponent,
    BikeDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthService, BikeService, BikeResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
