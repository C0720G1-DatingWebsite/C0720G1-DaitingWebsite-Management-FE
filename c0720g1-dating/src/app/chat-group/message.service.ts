import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {StorageService} from "../security/storage.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {IHobbies} from "../entity/hobbies";

const AUTH_API = 'http://localhost:8080/';
// Declare SockJS and Stomp
declare var SockJS;
declare var Stomp;

// declare var stompClient;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  username: string;
  obj_message: any;

  constructor(private tokenStorageService: StorageService,
              private toastr: ToastrService,
              private http: HttpClient) {

    this.initializeWebSocketConnection();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  public stompClient;
  public msg = [];


  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    console.log("connected")
    // tslint:disable-next-line:only-arrow-functions
    var message1 = [];
    this.stompClient.connect({}, function (frame) {
      that.username = that.tokenStorageService.getUser().username;
      that.getMessageList(7).subscribe((data: any[]) => {
          message1 = data;
        }, err => {},
        () => {
          that.msg = message1;
          console.log(that.msg);
        });

      that.stompClient.subscribe('/topic/1234', (message) => {

        if (message.body) {
          that.msg.push(JSON.parse(message.body));
          that.obj_message = JSON.parse(message.body);
          console.log(that.username);
          console.log(that.obj_message.img_url);
          if (that.obj_message.sender != that.username) {
            console.log('123');
            if (that.obj_message.content != null) {

              /*    alert(that.obj_message.content)*/
              that.toastr.info(that.obj_message.content, that.obj_message.sender + " đã gửi cho bạn một tin nhắn: ",
                {
                  enableHtml: true,
                  positionClass: 'toast-bottom-left'
                })
            }
          }
        }
      });

      // Tell your username to the server
      that.stompClient.send('/app/chat.addUser',
        {},
        JSON.stringify({sender: that.username, type: 'JOIN'})
      );

    });

  }

  onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
  }

  getMessageList(limit): Observable<any[]> {
    return this.http.get<any[]>(AUTH_API + 'api/list-message/1/'+limit,
      this.httpOptions);
  }

  sendMessage(message) {
    var currentdate = new Date();
    var datetime =
      currentdate.getHours() + ":"
      + currentdate.getMinutes() + " ✓";
    let messageContent = message.trim();
    if (messageContent && this.stompClient) {
      var chatMessage = {
        sender: this.username,
        content: messageContent,
        type: 'CHAT',
        imgUrl: this.tokenStorageService.getUser().avatar,
        timeStamp: datetime,
        id: null,
        boxId:1
      };
      this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    }
  }


}
