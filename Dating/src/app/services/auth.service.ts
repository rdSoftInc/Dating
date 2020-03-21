import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  isAuthListener = new BehaviorSubject<boolean>(false);

  usernameListener = new BehaviorSubject<string>('User');

  jwtHelper = new JwtHelperService();

  decodedToken: any;

  getIsAuth() {
    return this.isAuth;
  }

  getIsAuthListener() {
    return this.isAuthListener.asObservable();
  }

  getUsernameListener() {
    return this.usernameListener.asObservable();
  }

  constructor(public http: HttpClient, private router: Router) { }

  signup(model: any) {
    this.http.post('http://localhost:5000/api/auth/signup', model).subscribe(response => {
      if (response) {
        this.router.navigate(['/signin']);
      }
    });
  }

  login(model: any) {
    this.http.post('http://localhost:5000/api/auth/login', model).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.usernameListener.next(this.decodedToken.unique_name);
      }
    })).subscribe(response => {
      this.isAuth = true;
      this.isAuthListener.next(true);
      this.router.navigate(['/members']);
    }, error => {
      this.isAuth = false;
      this.isAuthListener.next(false);
    });
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.isAuth = false;
        this.isAuthListener.next(false);
      } else {
        this.decodedToken = this.jwtHelper.decodeToken(token);
        this.usernameListener.next(this.decodedToken.unique_name);
        this.isAuthListener.next(true);
        this.isAuth = true;
      }
    } else {
      this.isAuthListener.next(false);
      this.isAuth = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthListener.next(false);
    this.isAuth = false;
    this.router.navigate(['/']);
  }
}
