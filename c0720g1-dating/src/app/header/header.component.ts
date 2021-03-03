import {Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {StorageService} from "../security/storage.service";
import {Router} from "@angular/router";
import {MessageService} from "../chat-group/message.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  account: any;

  sender: any;
  content:any;
  time_stamp:any;


  @Output() emit: EventEmitter<any>;



  idAccount: number;

  constructor(private storageService: StorageService,
              private router: Router,
              private  messageService:MessageService) { }

  ngOnInit(): void {
  }

  emitLogin() {
    this.emit.emit();
  }

  logout() {
    this.storageService.logout();
    this.router.navigateByUrl("/login");
  }

  ngDoCheck(): void {
    this.sender=this.messageService.obj_message.sender;
    this.content=this.messageService.obj_message.content;
    this.time_stamp=this.messageService.obj_message.time_stamp;
    this.account = this.storageService.getUser();

    this.idAccount = this.storageService.getUser().id;

    if (this.account.avatar) {
      document.getElementById('main-avatar4').setAttribute('data-src', this.account.avatar);
    } else {
      document.getElementById('main-avatar4').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
    }
  }

  showPreview($event: Event) {

  }
}
