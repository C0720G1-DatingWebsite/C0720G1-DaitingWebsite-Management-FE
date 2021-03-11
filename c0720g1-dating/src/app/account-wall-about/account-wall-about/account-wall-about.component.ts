import {AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {IAccount} from "../../entity/account";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountWallAboutService} from "../account-wall-about.service";
import {IPost} from "../../entity/post";
import {StorageService} from "../../security/storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IFriend} from "../../entity/friend";
import {ToastrService} from "ngx-toastr";
import {MessageManager} from "../message-manager";
import {IReportContent} from "../../entity/report-content";
import {MemberReportService} from "../../account-report-management/member-report.service";
import {FriendListService} from "../../friends/friend-list.service";
import {IFriendDTO} from "../../entity/friendDTO";

@Component({
  selector: 'app-account-wall-about',
  templateUrl: './account-wall-about.component.html',
  styleUrls: ['./account-wall-about.component.scss']
})
export class AccountWallAboutComponent implements OnInit {
  id: number;
  loading = false;
  idComment: number;
  iAccount: IAccount;
  page: number = 0;
  size: number = 2;
  iPosts: IPost[];
  iFriends: IFriend[] = [];
  formGroup: FormGroup;
  idPost: number;
  account;
  loadingData = false;
  flagComment = false;

  public iAccountDTO: IFriendDTO;
  public friendList: IFriendDTO[];

  reportForm: FormGroup;
  reportContentList: IReportContent[];
  dateReport = new Date();


  constructor(private route: ActivatedRoute,
              private accountWallAboutService: AccountWallAboutService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService,
              private formBuilder: FormBuilder,
              public toastrService: ToastrService,
              private router: Router,
              public messageManager: MessageManager,
              private friendService: FriendListService,
              public memberReportService: MemberReportService) {
    this.loadScript();
  }

  ngOnInit(): void {
    this.getFindById();
    this.account = this.storageService.getUser();
    this.createCommentForm();
    this.getListReport();
    this.formReport();
    this.getAllFriend();
  }

  getFindById() {
    this.id = this.route.snapshot.params['idAccount'];
    this.accountWallAboutService.findById(this.id).subscribe((data: IAccount) => {
      this.iAccount = data;
      this.getAllPost();
    });
  }

  getAllPost() {
    this.accountWallAboutService.getAllPost(this.page, this.size, this.id).subscribe((data) => {
      this.iPosts = data.content;
    });
  }

  getAllFriend() {
    this.accountWallAboutService.getAllFriend(this.account.id).subscribe((data: IFriend[]) => {
      console.log('danh sách bạn của id hiẹn tại')
      console.log(data)
      this.iFriends = data;
    })
  }

  onScroll() {
    this.size += 2;
    this.loadingData = true;
    this.getAllPost();
  }

  createCommentForm() {
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(200)]],
      accountId: [this.account.id],
      postId: ['']
    });
  }

  submitFormCreate() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      this.flagComment = false;
      return;
    } else {
      this.formGroup.value.postId = this.idPost;
      this.accountWallAboutService.saveComment(this.formGroup.value).subscribe(data => {
        this.flagComment = false;
        this.ngOnInit();
        this.toastrService.success('Đăng bình luận thành công!', 'Thông báo')
      });
    }
  }

  getDeleteCommentById(idComment: number) {
    this.accountWallAboutService.deleteComment(idComment).subscribe(data => {
      this.ngOnInit();
      this.toastrService.success('Xóa bình luận thành công!', 'Thông báo')
    });
  }

  getIdCommentDelete(idComment: number) {
    this.idComment = idComment;
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
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
    }, 300);
  }

  getIdPost(id: any) {
    for (let i = 0; i < this.iPosts.length; i++) {
      if (this.iPosts[i].id == parseInt(id)) {
        this.idPost = this.iPosts[i].id;
      }
    }
  }

  flagCommentShow() {
    this.flagComment = true;
    this.ngOnInit();
  }

  getListReport() {
    this.memberReportService.getAllReportContent().subscribe(data => {
      this.reportContentList = data;
    });
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  report() {
    this.memberReportService.sendReportAccount(this.reportForm.value).subscribe(() => {
      this.ngOnInit();
      this.toastrService.success('Tố cáo thành công!', 'Thông báo');
    }, () => {
      this.ngOnInit();
      this.toastrService.error('Không thể tự tố cáo bản thân!', 'Thông báo');
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

  formReport() {
    this.reportForm = this.formBuilder.group({
      dateReport: [''],
      reportContent: [''],
      accountVictim: [''],
      accountTarget: ['']
    });
  }

  addFriend(idFri: number) {
    this.friendService.addFriend(this.storageService.getUser().id, idFri).subscribe(data => {
      this.iAccountDTO = data;
      console.log(data);
      this.ngOnInit();
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
    }, error => {
      console.log(error);
    });
  }

  delFriend(idFri: number) {
    this.friendService.delFriend(this.storageService.getUser().id, idFri).subscribe(data => {
      this.iAccountDTO = data;
      console.log(data);
      this.ngOnInit();
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
    }, error => {
      console.log(error);
    });
  }
}
