import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(private userService: UserService, private route: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {

    return this.userService.getUser(route.params.id).pipe(
      catchError(error => {
        console.log(error);
        this.route.navigate(['/members']);
        return of(null);
      })
    );

  }

}
