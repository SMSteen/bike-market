import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeResolver } from './services/bike.resolver.service';

import { BikesComponent } from './bikes/bikes.component';
import { HomeComponent } from './bikes/home/home.component';
import { BikeListComponent } from './bikes/nav/bike-list/bike-list.component';
import { BikeDetailsComponent } from './bikes/nav/bike-details/bike-details.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { DailyBikeComponent } from './bikes/home/daily-bike/daily-bike.component';

const routes: Routes = [
  {
    path: '',
    component: BikesComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'browse',
        component: BikeListComponent
      },
      {
        path: 'listings',
        component: BikeDetailsComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
