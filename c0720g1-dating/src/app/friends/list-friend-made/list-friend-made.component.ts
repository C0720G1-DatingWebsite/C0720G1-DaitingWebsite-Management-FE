import { Component, OnInit } from '@angular/core';
import {IFriend} from "../../entity/friend";
import {IAccount} from "../../entity/account";
import {LoadResourceService} from "../../load-resource.service";
import {FriendListService} from "../friend-list.service";
import { ActivatedRoute } from '@angular/router';
import {StorageService} from "../../security/storage.service";
import {FriendDTO} from "../../entity/friendDTO";

@Component({
  selector: 'app-list-friend-made',
  templateUrl: './list-friend-made.component.html',
  styleUrls: ['./list-friend-made.component.scss']
})
export class ListFriendMadeComponent implements OnInit {

  public friendList: IFriend[];
  public id: number;
  public iAccount: IFriend;
  public name = '';


  constructor( private loadResourceService:LoadResourceService,
               private friendService: FriendListService,
               private activatedRoute: ActivatedRoute,
               private storageService: StorageService) {
    this.loadScript()
  }

  ngOnInit(): void {
    this.getAccountById();
  }

  getAccountById(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.friendService.getAccountById(this.id).subscribe((data: IFriend) =>
    {
      this.iAccount = data;
      console.log(data);
      this.friendService.getListFriend(this.id).subscribe(data =>{
        this.friendList = data;
        this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
        console.log(data);
      })
    })
  }

  delFriend(id: number) {
    this.friendService.delFriend(this.id, id).subscribe(data => {
      this.friendList = data;
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  search(){
    this.friendService.searchFriend(this.id,this.name).subscribe(data => {
      this.friendList = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
    }, error => {
      console.log(error);
      this.friendList = [];
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
