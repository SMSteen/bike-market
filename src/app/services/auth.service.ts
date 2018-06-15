import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = '/api/auth/';
  userID: string;

  constructor(private http: HttpClient) {}

  login(user): Observable<User> {
    console.log(
      'auth.service --> sending user to database for verification',
      user
    );
    return this.http.post<User>(this.baseURL + 'login', user);
  }

  register(user): Observable<User> {
    console.log('auth.service --> sending user to database for addition', user);
    return this.http.post<User>(this.baseURL + 'register', user);
  }

  getOneUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseURL + id);
  }
}
