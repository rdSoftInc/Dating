import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isAuth = false;
  isAuthSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSub = this.authService.getIsAuthListener().subscribe(response => {
      this.isAuth = response;
    });
  }

  ngOnDestroy() {
    if (this.isAuthSub) {
      this.isAuthSub.unsubscribe();
    }
  }

}
