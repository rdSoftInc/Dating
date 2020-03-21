import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = new BehaviorSubject<boolean>(false);

  getIsAuthListener() {
    return this.isAuth.asObservable();
  }

  constructor(public http: HttpClient, private router: Router) { }

  signup(model: any) {
    this.http.post('http://localhost:5000/api/auth/signup', model).subscribe(response => {
      if (response) {
        this.router.navigate(['/']);
      }
    }, error => {
      console.log(error);
    });
  }

  login(model: any) {
    this.http.post('http://localhost:5000/api/auth/login', model).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
      }
    })).subscribe(response => {
      this.isAuth.next(true);
      this.router.navigate(['/']);
    }, error => {
      this.isAuth.next(false);
      console.log(error);
    });
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth.next(true);
    } else {
      this.isAuth.next(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuth.next(false);
    this.router.navigate(['/']);
  }
}
