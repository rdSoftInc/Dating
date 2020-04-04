import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  defaultPhoto = '../../assets/original.png';
  currentTab = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.route.queryParams.subscribe(params => {
      if (params.tab > 3) {
        this.currentTab = 0;
      } else {
        this.currentTab = params.tab;
      }
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];

    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }

    return imageUrls;
  }

  sendLike(id: number, knownAs: string) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe((response) => {
        if (response === false) {
          this.snackBar.open('You have liked ' + knownAs , null, {
            duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'end', panelClass: ['colorful-snackbar'],
          });
        } else {
          this.snackBar.open('You have already liked ' + knownAs , null, {
            duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'end', panelClass: ['error-snackbar'],
          });
        }
    });
  }

  changeTab(event) {
    this.currentTab = event.index;
  }

  changeTabToMessage() {
    this.currentTab = 3;
  }

}
