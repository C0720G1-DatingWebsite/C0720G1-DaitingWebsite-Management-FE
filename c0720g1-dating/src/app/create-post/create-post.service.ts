import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPolicy} from "../entity/policy";
import {PostDTO} from "../entity/PostDTO";

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  public API: string = "http://localhost:8081/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * TinVT
   * Get All Status
   * @return
   */
  getAllPolicy(): Observable<IPolicy[]>{
    return this.http.get<IPolicy[]>(this.API + "/get-list-policy")
  }

  /**
   * TinVT
   * Create New Post
   * @return
   */
  createPost(postDTO: PostDTO): Observable<boolean>{
    return this.http.post<boolean>(this.API + "/create-post/", JSON.stringify(postDTO), this.httpOptions)
  }
}
