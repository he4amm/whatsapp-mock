import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { DataService } from './data.service';

import { Video } from '../video';

@Injectable()
export class FilterService {

    data: Array<Video>;
    itemsPerPage: number;

    constructor(
        private dataService: DataService
    ) {
        // variable to control items per page
        this.itemsPerPage = 10;
    }

    getPage( opt ): Promise<any> {
        // make promise to return data
        return new Promise( (resolve, reject) => {
            // retrieve data from dataService
            this.dataService.get().subscribe( data => {
                // get data page by slice method
                const page = this.search(opt, data).slice((opt.id - 1) * this.itemsPerPage, opt.id * this.itemsPerPage);

                // reslove promise with data if length equal 10 and not 0
                if ( page.length || page.length === this.itemsPerPage ) {
                    // resolve data
                    resolve(page);
                }
                // pages finished so reject promise
                reject('end');
            });
        });
    }

    // search function take opt object containes title and video query
    search(opt, array): Array<Video> {
        return array.filter( (ele, index) => {
            // filter data by test if the string required is included for both fileds
            if ( ele['title'].includes(opt.title) && ele['parent_name'].includes(opt.parent_name) ) {
                return ele;
            }
        });
    }

}
