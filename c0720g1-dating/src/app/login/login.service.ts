import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * PhuocTC
 **/


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  URL = 'http://localhost:8081';

  httpOptions: any;

  constructor(private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(account: any) {
    return this.http.post(this.URL + '/login', account, this.httpOptions);
  }

  loginForFacebook(account: any) {
    return this.http.post(this.URL + '/login-facebook', account, this.httpOptions);
  }

  loginForGoogle(account: any) {
    return this.http.post(this.URL + '/login-google', account, this.httpOptions);
  }


  forgotPassword(username: any) {
    return this.http.get(this.URL + '/forgot-password?username=' + username);
  }

  checkVetifyCode(vetifyCode: string) {
    return this.http.get(this.URL + '/check-vetify-password?vetifyCode=' + vetifyCode);
  }

  changedPassword(code: string, newPassword: string) {
    return this.http.get(this.URL + '/changed-password?vetifyCode=' + code+ '&newPassword='+ newPassword);

  }
}
