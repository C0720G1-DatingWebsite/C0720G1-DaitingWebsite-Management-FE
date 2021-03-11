import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ICity} from "../entity/city";
import {catchError} from "rxjs/operators";
import {ICountry} from "../entity/country";
import {IJob} from "../entity/job";
import {IMaritalStatus} from "../entity/marital-status";
import {IComment} from "../entity/comment";
import {IAccount} from "../entity/account";

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH'
  };

  public apiUpdateAccountUrl = 'http://localhost:8080/api/public/';

  constructor(private httpClient: HttpClient) {
  }

  getAllCity(): Observable<ICity[]> {
    return this.httpClient.get<ICity[]>(this.apiUpdateAccountUrl + 'city', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllCountry(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(this.apiUpdateAccountUrl + 'country', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllJob(): Observable<IJob[]> {
    return this.httpClient.get<IJob[]>(this.apiUpdateAccountUrl + 'job', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllMaritalStatus(): Observable<IMaritalStatus[]> {
    return this.httpClient.get<IMaritalStatus[]>(this.apiUpdateAccountUrl + 'marital-status', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  findByIdAccount(idAccount): Observable<IAccount> {
    return this.httpClient.get<IAccount>(this.apiUpdateAccountUrl + '/findById/' + idAccount)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  editAccount(idAccount, account): Observable<IAccount> {
    return this.httpClient.put<IAccount>(this.apiUpdateAccountUrl + 'update/' + idAccount, account, this.httpOptions)
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
