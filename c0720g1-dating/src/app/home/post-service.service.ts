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

  getAllPolicy(): Observable<any>{
    return  this.http.get(this.url + 'policyList');
  }

  getAllAccountPost(): Observable<any>{
    return this.http.get(this.url + 'accountPost');
  }

  reductionLike(idPost,idAccountPost): Observable<any>{
    // @ts-ignore
    return this.http.patch(this.url + 'reductionLike/' + idPost + '/oke/' + idAccountPost)
  }

  increaseLike(idAccount,idPost): Observable<any>{
    // @ts-ignore
    return this.http.patch(this.url + 'increaseLike/' + idAccount + "/oke/" + idPost);
  }
  getListPost(idAccount,size): Observable<any> {
    return this.http.get<any>(this.url + 'postGetAll/' + idAccount + '/size/' + size);
  }
  editPost(post): Observable<IPost>{
    // @ts-ignore
    return this.http.put<IPost>(this.url + 'editPost' , post, this.header);
  }
}
