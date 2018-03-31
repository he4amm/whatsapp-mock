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
        this.chatList = result;
      });
  }

  loadChat( data ) {
    this.activeChatList( true );
    this.chatDetails = data;
  }

  activeChatList( action ) {
    this.activeChatDetailsView = action;
  }
}
