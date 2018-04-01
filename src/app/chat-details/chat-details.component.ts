import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit, AfterViewChecked {
  @Input('chatDetails') chatDetails: any;
  @Output() mobileBackAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addMessageInChat: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  message: String = '';
  _prevChatHeight: Number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.canScrollDown()) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    }
  }

  openPopup() {}

  setPopupAction(fn: any) {
    this.openPopup = fn;
  }

  canScrollDown(): boolean {
    /* compares prev and current scrollHeight */

    const can = (this._prevChatHeight !== this.myScrollContainer.nativeElement.scrollHeight);

    this._prevChatHeight = this.myScrollContainer.nativeElement.scrollHeight;

    return can;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this._prevChatHeight;
    } catch (err) { }
  }

  isFirstInRowDate(index) {
    if (!this.chatDetails.messages[index - 1]) { return true; }

    const prevItem = this.formatDateFromNow(this.chatDetails.messages[index - 1].date);
    const currentItem = this.formatDateFromNow(this.chatDetails.messages[index].date);

    return currentItem !== prevItem;
  }

  formatDateFromNow(date) {
    return moment(date).calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      lastWeek: 'dddd',
      nextWeek: 'dddd',
      sameElse: 'L'
    });
  }

  sendMessage(content, type) {
    // if message is empty terminate
    if (!this.message && type === 'text') { return; }

    if (type === 'text') {
      this.addMessageInChat.next([
        {
          sender: 'me',
          date: new Date,
          text: content,
          status: 'sent',
          attachment: {
            type: '',
            link: ''
          }
        },
        {
          id: this.chatDetails.id
        }
      ]);
      this.message = '';
    } else if (type === 'img') {
      this.addMessageInChat.next([
        {
          sender: 'me',
          date: new Date,
          text: '',
          status: 'sent',
          attachment: {
            type: 'image',
            link: content
          }
        },
        {
          id: this.chatDetails.id
        }
      ]);
    }

  }

  onSelectImg(event) {
    const reader = new FileReader();
    const createPharmacy = this;
    const _this = this;

    // validate format
    const format = event.target.files[0].name.split('.').pop();
    if (format !== 'png' && format !== 'jpg' && format !== 'jpeg') {
      alert('invalid format to upload');
      return;
    }

    reader.onload = function (e) {
      const src = e.target['result'];
      _this.sendMessage(src, 'img');
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  goBack() {
    this.mobileBackAction.next(false);
  }

}
