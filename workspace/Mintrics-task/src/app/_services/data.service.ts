import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    dataUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.dataUrl = '../../assets/data-source.json';
    }

    get(): Observable<any> {
        return this
            .http
            .get(this.dataUrl);
    }

}
