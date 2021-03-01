import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IStatus} from "../entity/status";

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

  getAllStatus(): Observable<IStatus[]>{
    return this.http.get<IStatus[]>(this.API + "/get-list-status")
  }
}
