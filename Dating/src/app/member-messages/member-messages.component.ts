import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/Message';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  form: FormGroup;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl(null)
    });
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    });
  }

  onSubmit() {
    if (!this.form.value.content) {
      return;
    }
    this.newMessage.recipientId = this.recipientId;
    this.newMessage.content = this.form.value.content;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.form.reset();
      this.newMessage.content = '';
    }, error => console.log(error));
  }

}
