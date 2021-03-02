import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StorageService} from "../security/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  account: any;
  idAccount: number;
  constructor(private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.storageService.logout();
    this.router.navigateByUrl("/login");
  }

  ngDoCheck(): void {
    this.account = this.storageService.getUser();
    this.idAccount = this.storageService.getUser().id;
    console.log(this.account.username);
    if (this.account.avatar) {
      document.getElementById('main-avatar4').setAttribute('data-src', this.account.avatar);
    } else {
      document.getElementById('main-avatar4').setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
    }
  }

  showPreview($event: Event) {

  }
}
