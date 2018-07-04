import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  activeChat: number;
  @Input('chatList') chatList: any[];
  @Output() showChat: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  ) {}

  ngOnInit() {}

  onChatClick( data ) {
    this.activeChat = data.id;
    this.showChat.next(data);
  }

  lastMsg( chat ) {
    return chat.messages[chat.messages.length - 1];
  }

  formatDateFromNow(date) {
    return moment(date).calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: 'h:mm a',
      lastWeek: 'dddd',
      nextWeek: 'dddd',
      sameElse: 'L'
    });
  }

}
