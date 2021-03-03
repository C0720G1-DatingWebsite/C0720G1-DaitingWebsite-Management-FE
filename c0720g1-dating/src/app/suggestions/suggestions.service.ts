import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InfoAccountDTO} from "../entity/InfoAccountDTO";
import {SuggestionToMakeFriendsDTO} from "../entity/SuggestionToMakeFriendsDTO";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private url = "http://localhost:8080/api/public";
  private header: any;

  constructor(private http: HttpClient) {
    this.header = new Headers({'Content-Type': 'application/context'})
  }

  private baseURL = 'http://localhost:8080/api/public';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  getAccountInformation(accountId): Observable<InfoAccountDTO> {
    return this.http.get<InfoAccountDTO>(this.baseURL + '/getAccountInformation/' + accountId, this.httpOptions);
  }

  getSuggestionToMakeFriends(suggestionToMakeFriends): Observable<SuggestionToMakeFriendsDTO[]> {
    return this.http.post<SuggestionToMakeFriendsDTO[]>(this.baseURL + '/suggestionToMakeFriends', {
      hobbiesName: suggestionToMakeFriends.hobbiesName,
      cityName: suggestionToMakeFriends.cityName,
      accountId: suggestionToMakeFriends.accountId,
      size: suggestionToMakeFriends.size
    }, this.httpOptions);
  }

  getSuggestedPairing(suggestedPairing): Observable<SuggestionToMakeFriendsDTO[]> {
    return this.http.post<SuggestionToMakeFriendsDTO[]>(this.baseURL + '/datingSuggestion', {
      hobbiesName: suggestedPairing.hobbiesName,
      cityName: suggestedPairing.cityName,
      gender: suggestedPairing.gender,
      maritalStatusId: suggestedPairing.maritalStatusId,
      accountId: suggestedPairing.accountId,
      size: suggestedPairing.size
    }, this.httpOptions);
  }


}
