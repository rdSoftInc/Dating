import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isAuth = false;
  isAuthSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.isAuthSub = this.authService.getIsAuthListener().subscribe(response => {
      this.isAuth = response;
      if (this.isAuth) {
        this.router.navigate(['/']);
      }
    });
  }

  onLogin() {
    this.authService.login({ username: this.form.value.username, password: this.form.value.password});
  }

  onSignup() {
    this.authService.signup({ username: this.form.value.username, password: this.form.value.password});
  }

  onCancel() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  ngOnDestroy() {
    if (this.isAuthSub) {
      this.isAuthSub.unsubscribe();
    }
  }

}
