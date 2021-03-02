import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IAccount} from "../entity/account";
import {catchError} from "rxjs/operators";
import {IComment} from "../entity/comment";
import {IAccountGroup} from "../entity/account-group";
import {IFriend} from "../entity/friend";


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
  private apiAccountAboutUrl = 'http://localhost:8080/api/public/wall-account/';
  private apiCommentUrl = 'http://localhost:8080/api/public/comment/';

  constructor(private httpClient: HttpClient) { }

  findById(idAccount): Observable<IAccount> {
    return this.httpClient.get<IAccount>(this.apiAccountAboutUrl + 'findById/' + idAccount)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  findByIdPostCount(idAccount): Observable<IAccount> {
    return this.httpClient.get<IAccount>(this.apiAccountAboutUrl + 'findByIdPostCount/' + idAccount)
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
  getAllGroup(idAccount: number): Observable<IAccountGroup[]>{
    return  this.httpClient.get<IAccountGroup[]>(this.apiAccountAboutUrl + 'findById/' + idAccount + '/list-group')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllFriend(idAccount: number): Observable<IFriend[]>{
    return  this.httpClient.get<IFriend[]>(this.apiAccountAboutUrl + 'findById/' + idAccount + '/list-friend')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveComment(comment): Observable<IComment>{
    return this.httpClient.post<IComment>(this.apiCommentUrl + 'create-comment', comment, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  editComment(comment, idComment):Observable<IComment>{
    return this.httpClient.post<IComment>(this.apiCommentUrl + 'update/' + idComment, comment)
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
