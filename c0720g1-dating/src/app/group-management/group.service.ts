import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public API = 'http://localhost:8080/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    public http: HttpClient
  ) {
  }

  getListGroup(page: number): Observable<any> {
    return this.http.get(this.API + 'list-group?page=' + page)
  }

  getGroupById(groupId: number): Observable<any> {
    return this.http.get(this.API + 'get-group/' + groupId)
  }

  getMemberQuantity(groupId: number): Observable<any> {
    return this.http.get(this.API + 'get-member-quantity/' + groupId)
  }

  getPostGroupQuantity(groupId: number): Observable<any> {
    return this.http.get(this.API + 'get-post-group-quantity/' + groupId)
  }

  getListMemberQuantity(): Observable<any> {
    return this.http.get(this.API + 'get-list-member-quantity')
  }

  deleteGroupById(groupId: number): Observable<any> {
    return this.http.delete(this.API + 'delete-group/' + groupId)
  }

  getListMember(groupId: number, page: number): Observable<any> {
    return this.http.get(this.API + 'list-member-group/' + groupId + '?page=' + page)
  }

  joinGroup(id: number, groupId: number) {
    return this.http.post(this.API + 'join-group/' + id + '/' + groupId, this.httpOptions)
  }

  findGroup(nameGroup: string, page: number) {
    return this.http.get(this.API + 'find-name-group/' + nameGroup + '?page=' + page)
  }

  getListJoinedGroup(accountId) {
    return this.http.get(this.API + 'account-joined-group/' + accountId)
  }

  searchMember(groupId: number, searchName: string, page: number) {
    return this.http.get(this.API + 'search-member-group/' + groupId + '/' + searchName + '?page=' + page)
  }
}


