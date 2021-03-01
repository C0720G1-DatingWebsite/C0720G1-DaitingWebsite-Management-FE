import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPost} from "../entity/post";

@Injectable({
  providedIn: 'root'
})
/** LuyenNT
 */
export class PostServiceService {
  private url = "http://localhost:8080/api/public/";
  private header: any;
  constructor(private http: HttpClient) {
    this.header = new Headers( {'Content-Type' : 'application/context'})

  }
  increaseLike(idAccount): Observable<any>{
    return this.http.get(this.url + 'increaseLike/' + idAccount);
  }
  getListPost(idAccount): Observable<any> {
    return this.http.get<any>(this.url + 'postGetAll/' + idAccount);
  }
  editPost(post): Observable<IPost>{
    return this.http.put<IPost>(this.url + '/editPost/' , post);
  }
}
