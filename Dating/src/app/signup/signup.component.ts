import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isAuth = false;
  isAuthSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.isAuthSub = this.authService.getIsAuthListener().subscribe({
      next: (response) => {
        this.isAuth = response;
        if (this.isAuth) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  onSignup() {
    this.authService.signup({ username: this.form.value.username, password: this.form.value.password});
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
