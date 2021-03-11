import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {GetFeedbackDTO} from "../../entity/GetFeedbackDTO";
import {MemberReportService} from "../member-report.service";
import {IReportMemberListDTO} from "../../entity/IReportMemberListDTO";
import {IAccount} from "../../entity/account";
import {IReportContent} from "../../entity/report-content";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-get-feedback',
  templateUrl: './get-feedback.component.html',
  styleUrls: ['./get-feedback.component.scss']
})
export class GetFeedbackComponent implements OnInit {
  temp = 1;
  p: any;
  accountId;
  reportMemberList: IReportMemberListDTO[];
  getFeedbackList: GetFeedbackDTO[];
  account: Account;
  accountMember: IAccount;
  reportContentList: IReportContent[];
  constructor(private loadResourceService: LoadResourceService,
              private memberReportService: MemberReportService,
              private toast: ToastrService) {
    this.loadScript();
    this.memberReportService.findMemberById(this.accountId).subscribe((data)=>{
      this.accountMember = data;
    });
    this.memberReportService.getAllReportContent().subscribe(data =>{
      this.reportContentList = data;
    });
  }

  ngOnInit(): void {
    this.loadScript();
    this.memberReportService.findAllFeedback().subscribe(data =>{
      this.getFeedbackList = data;
    });
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
  getId(content: string) {
    console.log(content);
    this.memberReportService.getAllReportContent().subscribe(data => {
      this.reportContentList = data;
    });
    if (this.temp == 1) {
      this.memberReportService.sendEmailReport(this.accountId, content).subscribe(() => {
        this.toast.success('Đã gửi email cảnh báo!', 'Thông báo:');
      }, () => {
        this.toast.error('Tài khoản đang trong thời gian bị khóa, vui lòng thử lại sau!', 'Thông báo:');
      });
    } else if (this.temp == 2) {
      this.memberReportService.lockAccountOneWeek(this.accountId, content).subscribe(() => {
        this.toast.success('Khóa tài khoản thành công!', 'Thông báo:');
      }, () => {
        this.toast.error('Tài khoản đang trong thời gian bị khóa, vui lòng thử lại sau!', 'Thông báo:');
      });
    } else if (this.temp == 3) {
      this.memberReportService.lockAccountOneMonth(this.accountId).subscribe(() => {
        this.toast.success('Khóa tài khoản thành công!', 'Thông báo:');
      }, () => {
        this.toast.error('Tài khoản đang trong thời gian bị khóa, vui lòng thử lại sau!', 'Thông báo:');
      });
    } else if (this.temp == 4) {
      this.memberReportService.lockAccountForever(this.accountId).subscribe(() => {
        this.toast.success('Khóa tài khoản thành công!', 'Thông báo:');
      }, () => {
        this.toast.error('Tài khoản đang trong thời gian bị khóa, vui lòng thử lại sau!', 'Thông báo:');
      });
    }
  }
  report(value: number) {
    this.temp = value
  }


  getIdAccountTarget(accountTarget: string) {
    this.memberReportService.findAccountTarget(accountTarget).subscribe(data=>{
      this.accountId = data.id;
      console.log("AAAAAAAAAAAAAAAAAÂ");
      console.log(data);
    })
  }
}
