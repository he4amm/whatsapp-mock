import { Component, HostListener } from '@angular/core';

import { FilterService } from './_services/filter.service';
import { Video } from './video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  tablePage: number;
  dataEnded: boolean;
  dataLoading: boolean;
  noDataToDisplay: boolean;
  tableContent: Array<Video>;

  sortEntry: string;
  sortType: string;

  filterTitle: string;
  filterParentName: string;

  constructor(
    private filterService: FilterService
  ) {
    // intiate values
    this.title =  'Mintrics-task';
    this.tablePage = 0;
    this.dataEnded = false;
    this.dataLoading = false;
    this.noDataToDisplay = false;
    this.filterTitle = '';
    this.filterParentName = '';
    this.tableContent = [];

    // load first page of data
    this.loadNextPage();
  }

  loadNextPage() {
    // if data ended or data being loading terminate
    if (this.dataEnded || this.dataLoading) {return; }

    // get page data by increment tablePage value and pass it as argument
    this.dataLoading = true;
    this.filterService.getPage({
      id: ++this.tablePage,
      title: this.filterTitle,
      parent_name: this.filterParentName
    })
      .then( data => {

        // fake retrieving data bu setTimout to feel like fetching it from server
        setTimeout(() => {
          // concat fetched data to current data
          this.tableContent = this.tableContent.concat(data);

          // if sort applied do it after retrive new data
          if (this.sortEntry) { this.sort( this.sortEntry, this.sortType ); }

          this.dataLoading = false;
          this.noDataToDisplay = false;
          if (this.tableContent.length < 10) { this.dataEnded = true; }
        }, 50);

        // catch reject promise and set dataEnded value to true
      }).catch(data => {
        if (data === 'end') {
          this.dataEnded = true;
          this.dataLoading = false;
        }

        if (!this.tableContent.length) { this.noDataToDisplay = true; }
      });
  }

  sort( entry: string, type: string) {
    this.sortEntry = entry;
    this.sortType = type;

    this.tableContent.sort( (a: Video, b: Video) => {
      if (type === 'Asc') {
        return (a[entry] > b[entry]) ? 1 : ((b[entry] > a[entry]) ? -1 : 0);
      } else {
        return (a[entry] < b[entry]) ? 1 : ((b[entry] < a[entry]) ? -1 : 0);
      }
    });
  }

  filter( title: string, parent_name: string ) {
    this.filterTitle = title;
    this.filterParentName = parent_name;
    this.dataEnded = false;
    this.dataLoading = false;
    this.noDataToDisplay = false;
    this.tableContent = [];
    this.tablePage = 0;
    this.loadNextPage();
  }

  // add HostLisnter for window scroll to fire onWindowScroll() function when scroll action happen
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;

    // load next page after reach last 50 pixel in view
    if ((scrollHeight - scrollPosition) <= 50) {
      this.loadNextPage();
    }
  }

}
