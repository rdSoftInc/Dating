import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Pagination, PaginatedResult } from '../models/Pagination';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;
  length: number;
  pageSize: number;
  pageEvent: PageEvent;
  pageSizeOptions = [6, 9, 12, 15];
  defaultPhoto = '../../assets/original.png';

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
      this.length = this.pagination.totalItems;
      this.pageSize  = this.pagination.itemsPerPage;
    });

    this.likesParam = 'Likers';
  }

  loadUsers(type?) {

    if (type) {
      this.likesParam = type;
    }

    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
      this.length = this.pagination.totalItems;
      this.pageSize  = this.pagination.itemsPerPage;
    });
  }

  pageChanged(event: PageEvent) {
    this.pagination.itemsPerPage = event.pageSize;
    this.pagination.currentPage = event.pageIndex + 1;
    this.loadUsers();
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
