import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {SERVER_CONFIG, SIDENAV_CONFIG} from './main.config'

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient,@Inject(SIDENAV_CONFIG) private config) {console.log(config)}

  exacuteHttpRequest(req) {
    return req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'delete'
      ? this.http
          .request(
            req.method,
            'http://localhost:3000/api/trashbin' + req.requestProp.urlEnding,
            {
              responseType: req.requestProp.responseType,
              params: req.params,
              observe: 'response',
            }
          )
          .pipe(catchError(this.handleError()))
      : this.http
          .request(
            req.method,
            'http://localhost:3000/api/trashbin' + req.requestProp.urlEnding,
            {
              responseType: req.requestProp.responseType,
              body: req.params,
              observe: 'response',
            }
          )
          .pipe(catchError(this.handleError()));
  }

  private handleError() {
    return (error: any): Observable<HttpErrorResponse> => {
      return of(error as HttpErrorResponse);
    };
  }
}
