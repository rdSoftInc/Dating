import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { Pagination, PaginatedResult } from '../models/Pagination';
import { FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  pageSizeOptions = [6, 9, 12, 15];
  defaultPhoto = '../../assets/original.png';
  length: number;
  pageSize: number;
  pageEvent: PageEvent;
  pagination: Pagination;

  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};

  form: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
      this.length = this.pagination.totalItems;
      this.pageSize  = this.pagination.itemsPerPage;
    });

    this.form = new FormGroup({
      minAge: new FormControl(null),
      maxAge: new FormControl(null),
      gender: new FormControl(this.user.gender === 'female' ? 'male' : 'female')
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilter() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.length = 0;
    this.form.reset();
    this.loadUsers();
  }

  pageChanged(event: PageEvent) {
    this.pagination.itemsPerPage = event.pageSize;
    this.pagination.currentPage = event.pageIndex + 1;
    this.loadUsers();
  }

  loadUsers(sortBy?) {
    if (this.form.value.minAge) {
      this.userParams.minAge = this.form.value.minAge;
    } else {
      this.userParams.minAge = 18;
    }
    if (this.form.value.maxAge) {
      this.userParams.maxAge = this.form.value.maxAge;
    } else {
      this.userParams.maxAge = 99;
    }
    if (this.form.value.gender) {
      this.userParams.gender = this.form.value.gender;
    }
    if (sortBy) {
      this.userParams.orderBy = sortBy;
    }
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
      this.length = this.pagination.totalItems;
    });
  }

  sendLike(id: number, knownAs: string) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe((response) => {
        if (response === false) {
          this.snackBar.open('You have liked ' + knownAs , null, {
            duration: 3000, verticalPosition: 'top', panelClass: ['colorful-snackbar'],
          });
        } else {
          this.snackBar.open('You have already liked ' + knownAs , null, {
            duration: 3000, verticalPosition: 'top', panelClass: ['error-snackbar'],
          });
        }
    });
  }

}
