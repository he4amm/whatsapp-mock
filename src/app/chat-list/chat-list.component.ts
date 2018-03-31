import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

}
