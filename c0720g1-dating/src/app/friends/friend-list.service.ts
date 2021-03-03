import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "../entity/account";
import {StorageService} from "../security/storage.service";
import {FriendDTO} from "../entity/friendDTO";
import {IFriend} from "../entity/friend";

@Injectable({
  providedIn: 'root'
})
export class FriendListService {

  private url = "http://localhost:8080/api/public";
  private header: any;

  constructor(private http: HttpClient,
              private store: StorageService) {
    this.header = new Headers({'Content-Type': 'application/context'})
  }

  getAccountById(id: number) : Observable<IFriend>{
    return this.http.get<IFriend>(this.url + '/profile/' +id);
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

  searchFriend(id:number, name:string): Observable<any>{
    return this.http.get<any>(this.url + '/profile/' +id + '/friend-list/search?name='+name)
  }

  searchAddFriend(id:number, nameFriends:string): Observable<any>{
    return this.http.get<any>(this.url + '/profile/' +id + '/search?nameFriends='+nameFriends)
  }

  addFriend(idAccount, idFriend): Observable<any> {
    return this.http.get(this.url + '/add-friend?idAccount=' + idAccount + '&idFriend=' +idFriend);
  }
}
