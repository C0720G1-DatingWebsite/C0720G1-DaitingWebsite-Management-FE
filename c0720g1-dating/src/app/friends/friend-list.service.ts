import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "../entity/account";

@Injectable({
  providedIn: 'root'
})
export class FriendListService {

  private url = "http://localhost:8080/api/public";
  private header: any;

  constructor(private http: HttpClient) {
    this.header = new Headers({'Content-Type': 'application/context'})
  }

  getAccountById(id: number) : Observable<IAccount>{
    return this.http.get<IAccount>(this.url + '/profile/' +id);
  }

  getListFriend(id: number): Observable<any>{
    return this.http.get<any>(this.url+ '/profile/' +id + '/friend-list')
  }

  getFriendRequest(id: number): Observable<any>{
    return this.http.get<any>(this.url+'/profile/'+id+'/friend-request')
  }

  acceptFriend(idAccount, idFriend): Observable<any> {
    return this.http.get(this.url + '/accept-friend-request?idAccount=' + idAccount + '&idFriend=' +idFriend);
  }

  delFriend(idAccount, idFriend): Observable<any> {
    return this.http.get(this.url + '/del-friend-request?idAccount=' + idAccount + '&idFriend=' +idFriend);
  }
}
