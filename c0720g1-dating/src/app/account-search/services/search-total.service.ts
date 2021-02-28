import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICity} from "../../entity/city";
import {SearchAndPage} from "../dto/SearchAndPage";
import {MemberResultDTO} from "../dto/MemberResultDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchTotalService {

  private apiServer = 'http://localhost:8080/api/public/search-total/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getCityList(): Observable<ICity[]>{
  return this.httpClient.get<ICity[]>(this.apiServer + 'city-list')
  }

  findCustomMembers(searchData: SearchAndPage): Observable<MemberResultDTO[]> {
    return  this.httpClient.post<MemberResultDTO[]>(this.apiServer+'get-member-list', searchData)
  }
}
