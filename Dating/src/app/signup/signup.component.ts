import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ DatePipe ]
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isAuth = false;
  isAuthSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      knownAs: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),

    }, this.passwordMatchValidator);
    this.isAuthSub = this.authService.getIsAuthListener().subscribe({
      next: (response) => {
        this.isAuth = response;
        if (this.isAuth) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null :  { mismatch : true };
  }

  ageValidator(g: FormGroup) {
    return g.get('dob').value === g.get('confirmPassword').value ? null :  { mismatch : true };
  }

  onSignup() {

    if (this.form.invalid) {
      return;
    }

    this.authService.signup(this.form.value);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
