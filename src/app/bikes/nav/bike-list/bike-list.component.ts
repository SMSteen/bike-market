import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BikeService } from '../../../services/bike.service';
import { AuthService } from '../../../services/auth.service';
import { Bike } from '../../../bike';
import { User } from '../../../user';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {
  bikes: Bike[] = [];
  bike: Bike;
  owner: User;
  userID: string;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userID = this.authService.userID;
    this.bikeService.getBikes().subscribe(
      bikes => {
        this.bikes = bikes;
      },
      error => {
        console.log(error);
      }
    );
  }

  onDelete(id: string) {
    this.bikeService.deleteBike(id).subscribe(
      deletedBike => {
        console.log('bike-list.component --> deleted bike', deletedBike);
        this.bikes = this.bikes.filter(
          delBike => delBike._id !== deletedBike._id
        );
        this.router.navigateByUrl('/browse');
      },
      error => console.log(error)
    );
  }

  onContact(bike: Bike) {
    this.authService.getOneUser(bike.owner).subscribe(
      owner => {
        const contact = alert(`${bike.title}  -  $${bike.price}\n\nOwner Name:
          ${owner.first_name} ${owner.last_name}\nEmail:  ${owner.email}`);
      },
      error => {
        console.log(error);
      }
    );
  }
}
