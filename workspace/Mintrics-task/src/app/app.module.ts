import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

// Services
import { DataService } from './_services/data.service';
import { FilterService } from './_services/filter.service';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppTableComponent } from './app-table/app-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
