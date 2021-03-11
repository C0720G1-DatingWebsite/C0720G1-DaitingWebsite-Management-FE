import {Component, Input, OnInit} from '@angular/core';
import {IFriend} from "../../entity/friend";
import {AccountWallAboutService} from "../account-wall-about.service";
import {Router} from "@angular/router";
import {LoadResourceService} from "../../load-resource.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  iFriends: IFriend[] = [];
  @Input() idAccountFriend: number;
  constructor(private accountWallAboutService: AccountWallAboutService,
              private loadResourceService: LoadResourceService,
              private router: Router,) {this.loadScript(); }

  ngOnInit(): void {
    this.getAllFriend();
  }

  getAllFriend() {
    this.accountWallAboutService.getAllFriend(this.idAccountFriend).subscribe((data: IFriend[]) => {
      this.iFriends = data;
    })
  }

  getLinkAccount(id: number) {
    this.router.navigate(['/account-wall', id, 'wall']);
    this.ngOnInit();
    // window.location.reload();
    this.loadScript();
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
    setTimeout(() => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
    }, 300);
  }
}
