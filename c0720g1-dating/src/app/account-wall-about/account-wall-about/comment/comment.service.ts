import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {IAccount} from "../../../entity/account";
import {IPost} from "../../../entity/post";
import {IComment} from "../../../entity/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST'
  };
  private apiCommentUrl = 'http://localhost:8080/api/public/comment/';

  constructor(private httpClient: HttpClient) {
  }

  getAllComment(id: number, page: number):Observable<any> {
    return this.httpClient.get<any>(this.apiCommentUrl + 'findById/' + id + '/page-comment?page=' + page)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllReply(id: number, page: number): Observable<any>{
    return this.httpClient.get<any>(this.apiCommentUrl + 'findById/' + id + '/page-reply?page=' + page)
      .pipe(
        catchError(this.errorHandler)
      );
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
