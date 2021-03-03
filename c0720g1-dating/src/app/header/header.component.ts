import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StorageService} from "../security/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FriendListService} from "../friends/friend-list.service";
import {LoadResourceService} from "../load-resource.service";
import {IAccount} from "../entity/account";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  account: any;
  public id: number;
  public nameFriends: string;
  public friendList: IAccount[];


  constructor(private storageService: StorageService,
              private loadResourceService:LoadResourceService,
              private friendService: FriendListService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAccountById();
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

  getAccountById(){
      this.friendService.getFriendRequest(this.storageService.getUser().id).subscribe(data =>{
        this.friendList = data;
        this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
        console.log(data);
      })
  }

  search(){
    this.router.navigateByUrl('profile/'+this.storageService.getUser().id+'/search/'+this.nameFriends);
    this.friendService.searchAddFriend(this.storageService.getUser().id,this.nameFriends).subscribe(data => {
      this.friendList = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
    }, error => {
      console.log(error);
      this.friendList = [];
    })
  }

  acceptFriend(id: number) {
    this.friendService.acceptFriend(this.storageService.getUser().id, id).subscribe(data => {
      this.friendList = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  delFriend(id: number) {
    this.friendService.delFriend(this.storageService.getUser().id, id).subscribe(data => {
      this.friendList = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  loadScript() {
    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    this.loadResourceService.loadScript('assets/js/global/global.popups.js');
    this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    this.loadResourceService.loadScript('assets/js/global/global.accordions.js');
    setTimeout( () => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    },200)
  }

}
