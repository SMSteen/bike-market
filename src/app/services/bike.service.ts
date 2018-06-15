import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bike } from '../bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  baseURL = '/api/bikes/';
  bikes: Bike[] = [];

  constructor(private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    console.log('bike.service --> getting all bikes');
    return this.http.get<Bike[]>(this.baseURL);
  }

  getSomeBikes(id): Observable<Bike[]> {
    console.log('bike.service --> getting user-owned bikes');
    return this.http.get<Bike[]>(`${this.baseURL}?owner:${id}`);
  }

  getOneBike(bikeID): Observable<Bike> {
    console.log('bike.service --> getting one bike');
    return this.http.get<Bike>(this.baseURL + bikeID);
  }

  addBike(bike: Bike): Observable<Bike> {
    console.log('bike.service --> adding new bike', bike);
    return this.http.post<Bike>(this.baseURL, bike);
  }

  updateBike(bike: Bike): Observable<Bike> {
    console.log('bike.service --> updating a bike');
    return this.http.put<Bike>(this.baseURL + bike._id, bike);
  }

  deleteBike(bikeID): Observable<Bike> {
    console.log('bike.service --> deleting a bike');
    return this.http.delete<Bike>(this.baseURL + bikeID);
  }
}
