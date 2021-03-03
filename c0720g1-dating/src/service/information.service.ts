import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InformationDTO} from "../dto/informationDTO";

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  private header: any;
  private API: string;

  constructor(private http: HttpClient) {
    this.header = new Headers( {'Content-Type' : 'application/context'})
  }

   information(account, id): Observable<any>{
    return this.http.put(this.API + 'information' + account + id,this.httpOptions );
   }

   getInformationById(id): Observable<InformationDTO>{
    return this.http.get<InformationDTO>(this.API + '/account' + id)
   }




}
