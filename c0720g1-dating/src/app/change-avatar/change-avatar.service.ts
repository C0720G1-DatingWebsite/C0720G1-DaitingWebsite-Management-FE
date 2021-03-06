import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeAvatarService {
  public API: string = "http://localhost:8080/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor( private http: HttpClient) { }

  /**
   * TinVT
   * Change Avatar
   * @return
   */
  changeAvatarAccount(id: number,avatar: string): Observable<boolean>{
   return this.http.patch<boolean>(this.API + "/change-avatar?idAccount="+ id +"&avatar="+ avatar, this.httpOptions);
  }
}
