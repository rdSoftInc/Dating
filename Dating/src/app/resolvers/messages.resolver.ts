import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Message } from '../models/Message';
import { AuthService } from '../services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

  pageNumber = 1;
  pageSize = 6;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {

    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, 'Unread').pipe(
      catchError(error => {
        console.log(error);
        this.router.navigate(['/']);
        return of(null);
      })
    );

  }

}
