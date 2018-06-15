import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerError: String;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit(user: User, event: Event): void {
    event.preventDefault();
    console.log('register-component --> form data', user)
    this.authService.register(user).subscribe(
      newUser => {
        console.log('register-component --> user successfully added', newUser)
        //saving userID in service
        this.authService.userID = newUser._id;
        this.router.navigateByUrl('browse');
      },
      error => {
        console.log('register-component, error creating user -->', error)
        this.registerError = error.error;
      }
    )
  }
}
