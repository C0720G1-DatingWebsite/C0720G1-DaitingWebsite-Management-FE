import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {GroupService} from "../group.service";
import {StorageService} from "../../security/storage.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit, AfterViewChecked {
  listGroup: any;
  page = 0;
  pageable: any;
  public listMemberQuantity: [];
  public id: number;
  public name: string;
  public accountId: number;
  public searchName: string;
  public listJoinedGroup: any;

  constructor(private loadResourceService: LoadResourceService,
              public groupService: GroupService,
              private storageService: StorageService,
              private toastrService: ToastrService,
              private router: Router) {
    this.loadScript();
  }

  ngOnInit(): void {
    this.getListGroup()
    this.accountId = this.storageService.getUser().id
  }

  getListGroup() {
    this.groupService.getListGroup(this.page).subscribe(data => {
      this.listGroup = data.content;
      this.pageable = data

      this.groupService.getListJoinedGroup(this.storageService.getUser().id).subscribe(data2 => {
          this.listJoinedGroup = data2;

          for (let i = 0; i < this.listGroup.length; i++) {
            for (let j = 0; j < this.listJoinedGroup.length; j++) {
              console.log(this.listGroup[i].id + '' + this.listJoinedGroup[j])
              if (this.listGroup[i].id === this.listJoinedGroup[j]) {
                this.listGroup[i].check = true;
                break;
              }
            }
          }
        }
      )
    })
    this.groupService.getListMemberQuantity().subscribe(data => {
      this.listMemberQuantity = data;
    })
    this.loadScript();
  }


  loadScript() {
    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    this.loadResourceService.loadScript('assets/js/global/global.accordions.js');
    setTimeout(() => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
      this.loadResourceService.loadScript('assets/js/global/global.popups.js');
    }, 200)
  }

  ngAfterViewChecked(): void {

    this.listGroup.forEach(function (value) {
      document.getElementById(String(value.id)).setAttribute('data-src', value.avatar)
    })
  }

  getContentDelete(id: any, name: any) {
    this.id = id;
    this.name = name
  }

  deleteGroup(id: number) {
    this.groupService.deleteGroupById(id).subscribe(data => {
      this.toastrService.success('xóa nhóm thành công!', 'Thông báo:');
      this.ngOnInit()
    })
  }

  joinGroup(accountId: number, groupId: number) {
    this.groupService.joinGroup(accountId, groupId).subscribe(data => {
      this.toastrService.success('tham giá nhóm thành công!', 'Thông báo:');
      this.ngOnInit()
    })
  }


  onSubmit() {
    if (this.searchName == '') {
      this.getListGroup()
    } else {
      this.groupService.findGroup(this.searchName, this.page).subscribe(data => {
        // @ts-ignore
        this.listGroup = data.content;
        this.pageable = data
      });
    }
  }
}
