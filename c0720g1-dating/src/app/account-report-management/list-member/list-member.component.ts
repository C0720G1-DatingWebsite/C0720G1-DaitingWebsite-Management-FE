import {Component, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {IMemberDTO} from "../../entity/IMemberDTO";
import {MemberReportService} from "../member-report.service";
import {Subscription} from "rxjs";
import {IReportMemberListDTO} from "../../entity/IReportMemberListDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IReportContent} from "../../entity/report-content";
import {IAccount} from "../../entity/account";
import {IReportMemberDTO} from "../../entity/IReportMemberDTO";
import {Router} from "@angular/router";
import {StorageService} from "../../security/storage.service";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
  providers: [DatePipe]
})
export class ListMemberComponent implements OnInit {
  reportForm: FormGroup;
  reportContentList: IReportContent[];
  memberList: IMemberDTO[];
  reportMemberList: IReportMemberListDTO[];
  accountMember: IAccount;
  reportMemberDTO: IReportMemberDTO;
  size = 3;
  account;
  dateReport = new Date();
  userNameSearch = "";
  dateOfBirthSearch = "";
  dateRegisterSearch = "";
  constructor(private loadResourceService: LoadResourceService,
              private memberReportService: MemberReportService,
              private formBuilder: FormBuilder,
              private router: Router,
              private storageService: StorageService,
              private toast: ToastrService
  ) {
    this.memberReportService.getAllReportContent().subscribe(data =>{
      this.reportContentList = data;
    });
  }

  ngOnInit(): void {
    this.loadScript();
    this.reportForm = this.formBuilder.group({
      dateReport: [''],
      reportContent: [''],
      accountVictim: [''],
      accountTarget: ['']
    });
    this.memberReportService.findAllMember(this.size).subscribe(value => {
        this.memberList = value;
      }, error => {
      },
      () => {
        console.log(this.memberList);
      });
    this.account = this.storageService.getUser();

  }
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
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

  report() {
    this.memberReportService.sendReportAccount(this.reportForm.value).subscribe(() => {
      this.router.navigateByUrl('/member').then(r => this.toast.success('Tố cáo thành công!', 'Thông báo'));
      console.log(this.reportForm.value);
    });
  }

  patchValue(userName: string) {
    this.reportForm = this.formBuilder.group({
      dateReport: [''],
      reportContent: [''],
      accountVictim: [this.account.username],
      accountTarget: [userName]
    });
    this.reportForm.get('dateReport').patchValue(this.formatDate(new Date()));
  }
  search(){
    this.memberReportService.searchMemberByUserNameAndDateOfBirthAndDateRegister(this.userNameSearch.trim(),
      this.dateOfBirthSearch.trim(), this.dateRegisterSearch.trim()).subscribe(data =>{
        this.memberList = data;
    },() =>{
        alert('Khong tim thay du lieu');
    })
  }

  onScroll() {
    this.size += 3;
    this.ngOnInit();
  }
}
