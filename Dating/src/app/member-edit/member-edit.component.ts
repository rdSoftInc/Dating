import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { User } from '../models/User';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit, OnDestroy {

  user: User;
  form: FormGroup;
  photoUrl: string;
  photoUrlSub: Subscription;
  defaultPhoto = '../../assets/original.png';

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.form = new FormGroup({
      introduction: new FormControl(this.user.introduction, [Validators.required]),
      lookingFor: new FormControl(this.user.lookingFor, [Validators.required]),
      interests: new FormControl(this.user.interests, [Validators.required]),
      city: new FormControl(this.user.city, [Validators.required]),
      country: new FormControl(this.user.country, [Validators.required])
    });
    this.photoUrlSub = this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  onUpdate() {
    this.user.introduction = this.form.value.introduction;
    this.user.lookingFor = this.form.value.lookingFor;
    this.user.interests = this.form.value.interests;
    this.user.city = this.form.value.city;
    this.user.country = this.form.value.country;
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(() => {
      this.form.reset(this.user);
    });
  }

  updateMainPhoto(url: any) {
    this.user.photoUrl = url;
  }

  ngOnDestroy() {
    if (this.photoUrlSub) {
      this.photoUrlSub.unsubscribe();
    }
  }

}
