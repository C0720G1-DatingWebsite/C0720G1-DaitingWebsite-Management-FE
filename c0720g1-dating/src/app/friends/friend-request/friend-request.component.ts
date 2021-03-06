import {Component, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {FriendListService} from "../friend-list.service";
import {ActivatedRoute} from "@angular/router";
import {IFriendDTO} from "../../entity/friendDTO";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit{

  public friendList: IFriendDTO[];
  public id: number;
  public iAccount: IFriendDTO;


  constructor( private loadResourceService:LoadResourceService,
               private friendService: FriendListService,
               private activatedRoute: ActivatedRoute,) {
    this.loadScript()
  }


  ngOnInit(): void {
    this.getAccountById();
  }

  getAccountById(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.friendService.getAccountById(this.id).subscribe((data: IFriendDTO) =>
    {
      this.iAccount = data;
      console.log(data);
      this.friendService.getFriendRequest(this.id).subscribe(data =>{
        this.friendList = data;
        console.log(this.friendList);
        this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
        console.log(data);
      })
    })
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

  acceptFriend(idFri:number) {
    console.log(idFri)
    this.friendService.acceptFriend(this.id,idFri).subscribe(data => {
      this.iAccount = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  delFriend(idFri: number) {
    this.friendService.delFriend(this.id, idFri).subscribe(data => {
      this.iAccount = data;
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }
}
