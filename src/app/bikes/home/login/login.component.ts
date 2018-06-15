import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../user';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginError: String;

  //TEMP VARIABLE UNTIL USING SESSION
  userIDSession: String;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit(user: User, event: Event): void {
    event.preventDefault();
    console.log('login.component --> form data', user)
    this.authService.login(user).subscribe(
      logged => {
        this.authService.userID = logged._id;
        this.router.navigateByUrl('browse');
      },
      error => {
        this.loginError = error.error;
      }
    )
  }
}
