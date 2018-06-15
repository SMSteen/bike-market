import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../../services/bike.service';
import { ActivatedRoute } from '@angular/router';

import { Bike } from '../../../bike';

@Component({
  selector: 'app-daily-bike',
  templateUrl: './daily-bike.component.html',
  styleUrls: ['./daily-bike.component.css']
})
export class DailyBikeComponent implements OnInit {
  bike: Bike;
  bikes: Bike[] = [];

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService
  ) {}

  ngOnInit() {
    this.bikeService.getBikes().subscribe(bikes => {
      this.bike = bikes[Math.floor(Math.random() * bikes.length) + 1];
    });
  }
}
