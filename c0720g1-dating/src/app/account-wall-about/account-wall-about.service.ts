import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IAccount} from "../entity/account";
import {catchError} from "rxjs/operators";
import {IPost} from "../entity/post";


@Injectable({
  providedIn: 'root'
})
export class AccountWallAboutService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST'
  };

  private apiAccountAboutUrl = 'http://localhost:8081/api/public/wall-account/';

  constructor(private httpClient: HttpClient) { }

  findById(idAccount): Observable<IAccount> {
    return this.httpClient.get<IAccount>(this.apiAccountAboutUrl + 'findById/' + idAccount)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllPost(page:number, idAccount: number): Observable<any>{
    return  this.httpClient.get<any>(this.apiAccountAboutUrl + 'findById/' + idAccount + '/list-post?page=' + page)
      .pipe(
        catchError(this.errorHandler)
      )
  }



  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
