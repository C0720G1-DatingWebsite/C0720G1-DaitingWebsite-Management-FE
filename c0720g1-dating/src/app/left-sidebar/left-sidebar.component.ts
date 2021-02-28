import {Component, DoCheck, OnInit, SimpleChanges} from '@angular/core';
import {StorageService} from "../security/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit, DoCheck {

  account: any;

  constructor(private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.account = this.storageService.getUser();
    console.log(this.account.username);
    if (this.account.avatar) {
      document.getElementById('main-avatar1').setAttribute('data-src', this.account.avatar);
      document.getElementById('main-avatar2').setAttribute('data-src', this.account.avatar);
      document.getElementById('main-avatar3').setAttribute('data-src', this.account.avatar);
    } else {
      document.getElementById('main-avatar1').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
      document.getElementById('main-avatar2').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
      document.getElementById('main-avatar3').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
    }


  }

}
