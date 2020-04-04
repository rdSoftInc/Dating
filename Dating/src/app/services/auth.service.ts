import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  isAuthListener = new BehaviorSubject<boolean>(false);

  usernameListener = new BehaviorSubject<string>('User');

  photoUrl = new BehaviorSubject<string>('../../assets/original.png');

  currentPhotoUrl = this.photoUrl.asObservable();

  jwtHelper = new JwtHelperService();

  decodedToken: any;

  currentUser: User;

  private token: string;

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getIsAuthListener() {
    return this.isAuthListener.asObservable();
  }

  getUsernameListener() {
    return this.usernameListener.asObservable();
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  constructor(public http: HttpClient, private router: Router) { }

  signup(user: any) {
    this.http.post('http://localhost:5000/api/auth/signup', user).subscribe(response => {
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
        this.token = user.token;
        localStorage.setItem('user', JSON.stringify(user.user));
        this.currentUser = user.user;
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.usernameListener.next(this.decodedToken.unique_name);
        this.changeMemberPhoto(this.currentUser.photoUrl);
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.decodedToken = null;
        this.currentUser = null;
        this.isAuthListener.next(false);
        this.isAuth = false;
        this.router.navigate(['/']);
      } else {
        this.decodedToken = this.jwtHelper.decodeToken(token);
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.changeMemberPhoto(this.currentUser.photoUrl);
        this.token = token;
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
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.isAuthListener.next(false);
    this.isAuth = false;
    this.router.navigate(['/']);
  }
}
