import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {IReportMemberListDTO} from "../../entity/IReportMemberListDTO";
import {MemberReportService} from "../member-report.service";
import {StorageService} from "../../security/storage.service";
import {LoadResourceService} from "../../load-resource.service";
import {IAccount} from "../../entity/account";

@Component({
  selector: 'app-report-member-list',
  templateUrl: './report-member-list.component.html',
  styleUrls: ['./report-member-list.component.scss']
})
export class ReportMemberListComponent implements OnInit {
  accountId;
  reportMemberList: IReportMemberListDTO[];
  account: Account;
  accountMember: IAccount;
  temp = 1;
  constructor(private activatedRoute: ActivatedRoute,
              private memberReportService: MemberReportService,
              private loadResourceService:LoadResourceService) {
  }

  ngOnInit(): void {
    this.loadScript();
    this.activatedRoute.paramMap.subscribe((data: ParamMap) =>{

      this.accountId = data.get('id');
      this.memberReportService.reportMemberList(this.accountId).subscribe(data =>{
        this.reportMemberList = data;
      });
    })
    this.memberReportService.findMemberById(this.accountId).subscribe((data)=>{
      this.accountMember = data;
    });
    console.log(this.reportMemberList);
    console.log(this.accountMember.userName);
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
    setTimeout( () => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/global/global.popups.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    },200)
  }
  getId() {
    if (this.temp == 1){
      this.memberReportService.sendEmailReport(this.accountId).subscribe(() =>{
        alert('Gửi email thành công');
      });
    } else if (this.temp == 2){
      this.memberReportService.lockAccountOneWeek(this.accountId).subscribe(() =>{
        alert('Gửi email thành công');
      },() =>{
        alert('Tài khoản đã bị khóa trước đó!')
      });
    } else if (this.temp == 3){
      this.memberReportService.lockAccountOneMonth(this.accountId).subscribe(() =>{
        alert('Gửi email thành công');
      },() =>{
        alert('Tài khoản đã bị khóa trước đó!')
      });
    }else if (this.temp == 4){
      this.memberReportService.lockAccountForever(this.accountId).subscribe(() =>{
        alert('Gửi email thành công');
      },() =>{
        alert('Tài khoản đã bị khóa trước đó!')
      });
    }
  }

  report(value: number) {
    this.temp = value
  }
}
