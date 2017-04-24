import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { ProjectItem, FileItem }  from './models/defineClass';
import { forEach }        from "@angular/router/src/utils/collection";

const URL_UPLOAD = 'http://www.mingjing2637.com/KoreFtpApi/api/upload/';
//const URL_UPLOAD = 'http://localhost:16818/api/upload/';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private dataUrl = '../app/imgs/test.json';  // URL to json file

  public projectItems: Array<ProjectItem>;

  constructor(private http: Http ) {}

  getProjectItems(): Promise<ProjectItem[]> {

    return this.http.get(this.dataUrl)
        .toPromise()
        .then(response => response.json().data as ProjectItem[])
        .catch(this.handleError);
  }


 // Json file data  *******
  getJsonDataByService(): Observable<string[]> {

    return this.http.get(this.dataUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {

    let body = res.json();

    return body || {};
  }

  private handleError(error: any) {

    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message

    let errMsg = (error.message) ? error.message :

        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    //console.error(errMsg); // log to console instead

    return Observable.throw(errMsg);
  }

  getHeroesFromWebApi(): Promise<ProjectItem[]> {
    return this.http.get(this.dataUrl)
        .toPromise()
        .then(response => response.json().data as ProjectItem[])
        .catch(this.handleError);
  }


  // Get File List from API -------------------------------------------------------------------
    getFileListFromWebApi() {

        let headers = new Headers({ 'Content-Type': 'application/json'}); 

        let options = new RequestOptions({ headers: headers });      

        return this.http.get(URL_UPLOAD, options)
            .map(this.extractData) 
            .catch(this.handleError);         
    }
}
