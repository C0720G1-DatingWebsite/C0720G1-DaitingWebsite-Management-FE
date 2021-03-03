import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMemberDTO} from "../entity/IMemberDTO";
import {IReportMemberListDTO} from "../entity/IReportMemberListDTO";
import {IAccount} from "../entity/account";
import {IReportMemberDTO} from "../entity/IReportMemberDTO";
import {IReportContent} from "../entity/report-content";
import {GetFeedbackDTO} from "../entity/GetFeedbackDTO";

@Injectable({
  providedIn: 'root'
})
export class MemberReportService {
  private API = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    private http: HttpClient
  ) {
  }

  findAllMember(size: number): Observable<IMemberDTO[]> {
    return this.http.get<IMemberDTO[]>(this.API + '/member?size=' + size );
  }
  /*
  tim kiem theo username, ngay sinh, ngay tham gia
   */
  searchMemberByUserNameAndDateOfBirthAndDateRegister(userNameSearch: string, dateOfBirthSearch:
    string, dateRegisterSearch: string): Observable<IMemberDTO[]>{
    return this.http.get<IMemberDTO[]>(this.API + '/member?userNameSearch=' + userNameSearch + '&dateOfBirthSearch=' +
      dateOfBirthSearch + '&dateRegisterSearch=' + dateRegisterSearch);
  }
  /*
  * lay account theo id
   */
  findMemberById(accountId: number): Observable<IAccount> {
    return this.http.get<IAccount>(this.API + '/find-member-by-id/' + accountId);
  }

  /*
* lich su report cua thanh vien
 */
  reportMemberList(accountId: number): Observable<IReportMemberListDTO[]> {
    return this.http.get<IReportMemberListDTO[]>(this.API + '/report-member-list/' + accountId);
  }

  /*
  * khoa tai khoan 1 tuan
   */
  lockAccountOneWeek(accountId): Observable<any> {
    return this.http.get<any>(this.API + '/lock-account-one-week/' + accountId);
  }

  /*
* khoa tai khoan 1 thang
 */
  lockAccountOneMonth(accountId): Observable<any> {
    return this.http.get<any>(this.API + '/lock-account-one-month/' + accountId);
  }

  /*
* khoa tai khoan vinh vien
*/
  lockAccountForever(accountId): Observable<any> {
    return this.http.get<any>(this.API + '/lock-account-forever/' + accountId);
  }

  /*
  send email report
   */
  sendEmailReport(id: number): Observable<any> {
    return this.http.get<any>(this.API + '/send-warning-message/' + id);
  }

  /*
  * bao cao lam dung
   */
  sendReportAccount(reportMemberDTO): Observable<IReportMemberDTO> {
    return this.http.post<IReportMemberDTO>(this.API + '/send-report-feedback-account', reportMemberDTO, this.httpOptions);
  }

  /*
  Report content list
   */
  getAllReportContent(): Observable<IReportContent[]> {
    return this.http.get<IReportContent[]>(this.API + '/report-content');
  }
  /*
  get-feedback list
   */
  findAllFeedback(): Observable<GetFeedbackDTO[]>{
    return this.http.get<GetFeedbackDTO[]>(this.API + '/get-feedback');
  }
}
