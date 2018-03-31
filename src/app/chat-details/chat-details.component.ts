import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit {
  @Input('chatDetails') chatDetails: any;
  @Output() mobileBackAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  isFirstInRow(index) {
    if (!this.chatDetails.messages[index - 1]) { return true; }

    const prevItem = this.chatDetails.messages[index - 1].sender;
    const currentItem = this.chatDetails.messages[index].sender;

    return currentItem !== prevItem;
  }

  goBack() {
    this.mobileBackAction.next(false);
  }

}
