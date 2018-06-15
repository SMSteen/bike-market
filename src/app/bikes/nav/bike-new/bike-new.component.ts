import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Bike } from '../../../bike';
import { BikeService } from '../../../services/bike.service';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-bike-new',
  templateUrl: './bike-new.component.html',
  styleUrls: ['./bike-new.component.css']
})
export class BikeNewComponent implements OnInit {
  bike: Bike = new Bike();
  userID: string;

  @Output()
  newBike: EventEmitter<Bike> = new EventEmitter();

  constructor(
    private router: Router,
    private bikeService: BikeService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userID = this.authService.userID;
  }

  create(form: NgForm, event: Event): void {
    event.preventDefault();
    const { value: bike } = form;
    console.log('bike-new.component --> form data', bike);
    this.bikeService.addBike(bike).subscribe(
      newBike => {
        console.log('bike-new.component --> bike successfully added', newBike);
        // this.router.navigateByUrl('/listings');
        this.newBike.emit(newBike);
        form.reset();
      },
      error => {
        console.log('bike-new.component, error creating bike -->', error);
      }
    );

  }
}
