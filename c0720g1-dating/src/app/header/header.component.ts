import {Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {StorageService} from "../security/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FriendListService} from "../friends/friend-list.service";
import {LoadResourceService} from "../load-resource.service";
import {MessageService} from "../chat-group/message.service";
import {IFriendDTO} from "../entity/friendDTO";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  account: any;
  public id: number;
  public nameFriends: string;
  public friendList: IFriendDTO[];
  public iAccount: IFriendDTO;


  sender: any;
  content:any;
  time_stamp:any;


  @Output() emit: EventEmitter<any>;



  idAccount: number;

  constructor(private storageService: StorageService,
              private loadResourceService:LoadResourceService,
              private friendService: FriendListService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService:MessageService) { }
  ngOnInit(): void {
    this.getAccountById();
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

  getAccountById(){
      this.friendService.getFriendRequest(this.storageService.getUser().id).subscribe(data =>{
        this.friendList = data;
        this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
        console.log(data);
      })
  }

  search(){
    this.router.navigateByUrl('profile/'+this.storageService.getUser().id+'/search/'+this.nameFriends);
  }

  acceptFriend(id: number) {
    this.friendService.acceptFriend(this.storageService.getUser().id, id).subscribe(data => {
      this.iAccount = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  delFriend(id: number) {
    this.friendService.delFriend(this.storageService.getUser().id, id).subscribe(data => {
      this.iAccount = data;
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
  showPreview($event: Event) {

  }
}
