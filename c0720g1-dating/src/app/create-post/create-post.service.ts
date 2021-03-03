import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IStatus} from "../entity/status";
import {IPolicy} from "../entity/policy";

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  public API: string = "http://localhost:8080/api";
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
  // createPost(): Observable<boolean>{
  //   return this.http.post<boolean>(this.API + "/create-post/")
  // }
}
