import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class ListResolver implements Resolve<User[]> {

  pageNumber = 1;
  pageSize = 6;
  likesParam = 'Likers';

  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {

    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
      catchError(error => {
        console.log(error);
        this.router.navigate(['/']);
        return of(null);
      })
    );

  }

}
