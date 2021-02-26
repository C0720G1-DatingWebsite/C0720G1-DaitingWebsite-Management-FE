import {Component, DoCheck, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {IAccount} from "../../entity/account";
import {ActivatedRoute} from "@angular/router";
import {AccountWallAboutService} from "../account-wall-about.service";
import {IPost} from "../../entity/post";
import {StorageService} from "../../security/storage.service";

@Component({
  selector: 'app-account-wall-about',
  templateUrl: './account-wall-about.component.html',
  styleUrls: ['./account-wall-about.component.scss']
})
export class AccountWallAboutComponent implements OnInit {
  id: number;
  iAccount: IAccount;
  page: number = 0;
  iPosts: IPost[];
  account: any;

  constructor(private route: ActivatedRoute,
              private accountWallAboutService: AccountWallAboutService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService) {
    this.loadScript()
  }


  ngOnInit(): void {
    this.getFindById()
  }

  getFindById() {
    this.id = this.route.snapshot.params['idAccount'];
    this.accountWallAboutService.findById(this.id).subscribe((data: IAccount) => {
      this.iAccount = data;
      console.log(data);
      this.accountWallAboutService.getAllPost(this.page, this.id).subscribe((data) => {
        this.iPosts = data.content;
        console.log(data.content);
      })
    })
  }

  getAge(dayOfBirth: string) {
    let current = new Date();
    let birth = new Date(dayOfBirth);
    let age = current.getFullYear() - birth.getFullYear();
    let month = current.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && current.getDate() < birth.getDate())) {
      age--;
    }
    return age;
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
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    }, 200)
  }

}
