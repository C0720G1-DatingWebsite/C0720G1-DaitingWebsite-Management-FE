import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {FriendListService} from "../friend-list.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../security/storage.service";
import {IFriend} from "../../entity/friend";
import {IAccount} from "../../entity/account";

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {

  public friendList: IFriend[];
  public id: number;

  constructor( private loadResourceService:LoadResourceService,
               private friendService: FriendListService,
               private activatedRoute: ActivatedRoute,
               private storageService: StorageService) {
    this.loadScript()
  }

  ngOnInit(): void {
    this.search();
  }

  search(){
    this.activatedRoute.paramMap.subscribe(param => {
      this.friendService.searchAddFriend(this.storageService.getUser().id, param.get('nameSearch')).subscribe(data => {
        this.friendList = data;
        this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
        console.log(data);
      }, error => {
        console.log(error);
        this.friendList = [];
      });
    });
  }

  addFriend(id: number) {
    this.friendService.addFriend(this.storageService.getUser().id, id).subscribe(data => {
      this.friendList = data;
      console.log(data);
      this.ngOnInit();
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
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
