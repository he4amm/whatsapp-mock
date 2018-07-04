import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EmojiPickerModule } from 'ng-emoji-picker';

import { AppComponent } from './app.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';

import { DataService } from './_services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    EmojiPickerModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
