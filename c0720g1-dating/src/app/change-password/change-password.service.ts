import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccountDTO} from "./IAccountDTO";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  public API: string = "http://localhost:8080/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  constructor(
    private http : HttpClient
  ) { }

  /**
   * TinVT
   * Change Password
   * @return
   */
  changePassword(id:number, pass:string): Observable<any>{
    return this.http.put(this.API + "/change-password/"+ id + "/"+ pass, this.httpOptions);
  }

  /**
   * TinVT
   * Get Account By Id
   * @return
   */
  findAccountDTOById(id: number): Observable<IAccountDTO>{
    return this.http.get<IAccountDTO>(this.API + "/find-by-id/"+id);
  }

  /**
   * TinVT
   * Check Password
   * @return
   */
  checkPassword(id: number,pass : string): Observable<boolean>{
    return this.http.get<boolean>(this.API +"/check-password/" + id + "/" + pass);
  }
}
