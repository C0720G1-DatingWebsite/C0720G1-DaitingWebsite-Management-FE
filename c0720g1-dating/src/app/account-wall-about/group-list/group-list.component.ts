import {Component, Input, OnInit} from '@angular/core';
import {IAccountGroup} from "../../entity/account-group";
import {AccountWallAboutService} from "../account-wall-about.service";
import {LoadResourceService} from "../../load-resource.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() idAccountGroup;
  iAccountGroups: IAccountGroup[] = [];
  constructor(private accountWallAboutService: AccountWallAboutService,
              private loadResourceService: LoadResourceService,
              private router: Router,) {this.loadScript(); }

  ngOnInit(): void {
    this.getAllGroup();
  }

  getAllGroup() {
    this.accountWallAboutService.getAllGroup(this.idAccountGroup).subscribe((data: IAccountGroup[]) => {
      this.iAccountGroups = data;
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
    setTimeout(() => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
    }, 300);
  }
}
