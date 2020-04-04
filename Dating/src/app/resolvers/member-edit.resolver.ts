import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from '../services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(private userService: UserService, private route: Router, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {

    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        console.log(error);
        this.route.navigate(['/']);
        return of(null);
      })
    );

  }

}
