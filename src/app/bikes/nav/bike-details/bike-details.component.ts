import { Component, OnInit } from '@angular/core';

import { BikeService } from '../../../services/bike.service';
import { AuthService } from '../../../services/auth.service';
import { Bike } from '../../../bike';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.css']
})
export class BikeDetailsComponent implements OnInit {
  bikes: Bike[] = [];
  userID: string;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userID = this.authService.userID;
    this.bikeService.getSomeBikes(this.userID).subscribe(
      bikes => {
        this.bikes = bikes;
      },
      error => {
        console.log(error);
      }
    );
  }

  onCreate(newBike: Bike) {
    this.bikes.push(newBike);
  }

  onDelete(id: string) {
    this.bikeService.deleteBike(id).subscribe(
      deletedBike => {
        console.log(
          'bike-details.component --> successfully deleted bike',
          deletedBike
        );
        this.bikes = this.bikes.filter(
          delBike => delBike._id !== deletedBike._id
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(bike: Bike) {
    this.bikeService.updateBike(bike).subscribe(
      updatedBike => {
        console.log(
          'bike-details.component --> successfully updated bike',
          updatedBike
        );
        this.bikes.push(updatedBike);
      },
      error => {
        console.log(error);
      }
    );
  }
}
