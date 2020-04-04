import { Component, OnInit } from '@angular/core';
import { Message } from '../models/Message';
import { Pagination, PaginatedResult } from '../models/Pagination';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  pageSizeOptions = [6, 9, 12, 15];
  length: number;
  pageSize: number;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
      this.length = this.pagination.totalItems;
      this.pageSize  = this.pagination.itemsPerPage;
    });
  }

  loadMessages(type?: string) {
    if (type) {
      this.messageContainer = type;
    }
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      });
  }

  deleteMessages(id: number) {
    this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    });
  }

  pageChanged(event: PageEvent) {
    this.pagination.itemsPerPage = event.pageSize;
    this.pagination.currentPage = event.pageIndex + 1;
    this.loadMessages();
  }

}
