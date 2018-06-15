import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { Bike } from '../bike';
import { BikeService } from '../services/bike.service';

@Injectable({
  providedIn: 'root'
})
export class BikeResolver implements Resolve<Bike[]> {
  constructor(private bikeService: BikeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Bike[]> {
    return this.bikeService.getBikes();
  }
}
