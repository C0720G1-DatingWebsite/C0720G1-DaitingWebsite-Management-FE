import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {GroupService} from "../group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IGroup} from "../IGroup";

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent implements OnInit, AfterViewChecked {
  public groupId: number;
  public group: IGroup;
  public memberQuantity: number;
  public postQuantity: number;


  constructor(private loadResourceService: LoadResourceService,
              public groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
    this.loadScript();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data => {
      this.groupId = Number(data.id)
      this.groupService.getMemberQuantity(this.groupId).subscribe(data => {
        this.memberQuantity = data
      })
      this.groupService.getGroupById(this.groupId).subscribe(data => {
        this.group = data
      })
      this.groupService.getPostGroupQuantity(this.groupId).subscribe(data =>{
        this.postQuantity = data
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
    setTimeout(() => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    }, 200)
  }

  ngAfterViewChecked(): void {

    document.getElementById(String(this.groupId)).setAttribute('data-src', this.group.avatar)
  }

}
