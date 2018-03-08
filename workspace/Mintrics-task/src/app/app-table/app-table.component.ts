import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css']
})
export class AppTableComponent implements OnInit {

  sortTypes: string[];
  currentSortedEntry: string;
  currentSortedType: string;
  titleFilter: string;
  parentFilter: string;
  timeOutTyping: any;
  @Input() content: Array<Video>;
  @Input() loading: boolean;
  @Input() ended: boolean;
  @Input() noData: boolean;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSort: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.sortTypes = ['Asc', 'Dec'];
    this.titleFilter = '';
    this.parentFilter = '';
  }

  sortData(entry, type) {
    // if you clicked on the same soreted entry toggle sort type
    if (this.currentSortedEntry === entry) {
      type = this.currentSortedType === this.sortTypes[0] ? this.sortTypes[1] : this.sortTypes[0];
    }

    // emit event to the parent
    this.onSort.emit([entry, type]);

    // store current state of sorting
    this.currentSortedEntry = entry;
    this.currentSortedType = type;
  }

  filterData() {
    // clear last typing timout
    clearTimeout( this.timeOutTyping );

    // make timeout until user finish typing then emit the function
    this.timeOutTyping = setTimeout(() => {
      this.onFilter.emit([this.titleFilter , this.parentFilter]);
    }, 1000);
  }

}
