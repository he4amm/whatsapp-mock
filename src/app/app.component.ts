import { Component, OnInit } from '@angular/core';
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chatList: any[];
  chatDetails: any[];
  activeChatDetailsView: boolean;

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getChatList()
      .subscribe(result => {
        this.chatList = result.sort((a, b) => a.messages[a.messages.length - 1].date < b.messages[b.messages.length - 1].date ? 1 : -1);
      });
  }

  loadChat( data ) {
    this.activeChatList( true );
    this.chatDetails = data;
  }

  activeChatList( action ) {
    this.activeChatDetailsView = action;
  }

  addMessage(message) {
    // get chat object from chat list by id passed
    const chat = this.chatList.find(a => a.id === message[1].id);

    // remove chat from list
    this.chatList.splice(this.chatList.indexOf(chat), 1);
    // add it to the begging
    this.chatList.unshift(chat);

    // push new message to chatDetails array
    chat.messages.push(message[0]);

    // scroll top in chat list
    document.getElementById('chatlist').scrollTop = 0;
  }
}
