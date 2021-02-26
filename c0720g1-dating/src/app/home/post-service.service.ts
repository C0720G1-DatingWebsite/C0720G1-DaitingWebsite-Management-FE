import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../security/storage.service";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private url = "http://localhost:8080/api/public/";
  private header: any;
  constructor(private http: HttpClient) {
    this.header = new Headers( {'Content-Type' : 'application/context'})

  }

  getListPost(idAccount): Observable<any> {
    return this.http.get<any>(this.url + 'postGetAll' + idAccount);
  }
}
