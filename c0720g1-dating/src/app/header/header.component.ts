import {Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {StorageService} from "../security/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  account: any;

  @Output() emit: EventEmitter<any>;

  constructor(private storageService: StorageService,
              private router: Router) { }

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
    this.account = this.storageService.getUser();
    console.log(this.account.username);
    if (this.account.avatar) {
      document.getElementById('main-avatar4').setAttribute('data-src', this.account.avatar);
    } else {
      document.getElementById('main-avatar4').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
    }

  }


}
