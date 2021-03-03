import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "../app/entity/account";
const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  register(account: IAccount): Observable<any>{
    console.log(account.userName);
    console.log(account.password);
      return this.http.post(API + 'signup',JSON.stringify(account), this.httpOptions);
  }
  verify(code:string): Observable<any> {
    console.log(code)
    return this.http.post(API + 'verify', {
      code: code
    }, this.httpOptions);
  }
}
