import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {GroupService} from "../group.service";
import {IGroup} from "../IGroup";
import {StorageService} from "../../security/storage.service";

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit, AfterViewChecked {
  public listGroup: IGroup [];
  page = 0;
  pageable: any;
  public listMemberQuantity: [];


  constructor(private loadResourceService: LoadResourceService,
              public groupService: GroupService,
              private storageService: StorageService) {
    this.loadScript();
  }

  ngOnInit(): void {
    this.getListGroup()

    this.storageService.getUser().subscribe(data =>{
      console.log(data)
    });
  }

  getListGroup() {
    this.groupService.getListGroup(this.page).subscribe(data => {
      console.log(data)
      this.listGroup = data.content;
      this.pageable = data
    })
    this.groupService.getListMemberQuantity().subscribe(data => {
      this.listMemberQuantity = data;
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
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    }, 200)
  }

  ngAfterViewChecked(): void {

    for (let i = 0; i < this.listGroup.length; i++) {
      document.getElementById(String(this.listGroup[i].id)).setAttribute('data-src', this.listGroup[i].avatar)
    }
  }

}
