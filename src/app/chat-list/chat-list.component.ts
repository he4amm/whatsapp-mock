import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatList: any[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getChatList()
      .subscribe(result => {
        this.chatList = result;
      });
  }

}
