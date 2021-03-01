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

  loadAvatarGroup(imgUrl: string) {
    document.getElementById('avatar-group').setAttribute('data-src', imgUrl);
    document.getElementById('background-group').setAttribute('data-src', imgUrl);
  }
}

