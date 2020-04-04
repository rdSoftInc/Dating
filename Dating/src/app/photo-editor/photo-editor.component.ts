import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from '../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

const URL = 'http://localhost:5000/api/users/';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent {

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
  currentPhoto: Photo;

  constructor(private authService: AuthService, private userService: UserService) {

    this.uploader = new FileUploader({
      url: URL + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {

      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.currentPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentPhoto.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    });
  }

  deletePhoto(photo: Photo) {
    this.userService.deletePhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.photos = this.photos.filter(p => p.id !== photo.id);
    });
  }

}
