import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  isAuthSub: Subscription;
  username: string;
  usernameSub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {}

  ngOnInit() {
    this.isAuthSub = this.authService.getIsAuthListener().subscribe(response => {
      this.isAuth = response;
    });
    this.usernameSub = this.authService.getUsernameListener().subscribe(response => {
      this.username = response;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.isAuthSub) {
      this.isAuthSub.unsubscribe();
    }
    if (this.usernameSub) {
      this.usernameSub.unsubscribe();
    }
  }

}
