import {AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {IAccount} from "../../entity/account";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountWallAboutService} from "../account-wall-about.service";
import {IPost} from "../../entity/post";
import {StorageService} from "../../security/storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IAccountGroup} from "../../entity/account-group";
import {IFriend} from "../../entity/friend";
import {ToastrService} from "ngx-toastr";
import {MessageManager} from "../message-manager";

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
  pageable: any;
  size: number = 2;
  iPosts: IPost[];
  iAccountGroups: IAccountGroup[] = [];
  iFriends: IFriend[] = [];
  formGroup: FormGroup;
  idPost: number;
  account;
  loadingData = false;

  constructor(private route: ActivatedRoute,
              private accountWallAboutService: AccountWallAboutService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toastrService: ToastrService,
              public messageManager: MessageManager) {
    this.loadScript();
  }

  ngOnInit(): void {
    this.getFindById();
    this.account = this.storageService.getUser();
    this.createCommentForm();
  }

  getFindById() {
    this.id = this.route.snapshot.params['idAccount'];
    this.accountWallAboutService.findById(this.id).subscribe((data: IAccount) => {
      this.iAccount = data;
      this.getAllPost();
      this.getAllGroup();
      this.getAllFriend();
    });
  }

  getAllPost() {
    this.accountWallAboutService.getAllPost(this.page, this.size, this.id).subscribe((data) => {
      // if (this.iPosts.length == data.length){
        this.iPosts = data.content;
        this.pageable = data;
      // }


    });
  }

  onScroll() {
    this.size += 2;
    this.loadingData = true;
    this.getAllPost();
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/content/content.js');
    // this.loadScript();
  }

  getAllGroup() {
    this.accountWallAboutService.getAllGroup(this.id).subscribe((data: IAccountGroup[]) => {
      this.iAccountGroups = data;
    })
  }

  getAllFriend() {
    this.accountWallAboutService.getAllFriend(this.id).subscribe((data: IFriend[]) => {
      this.iFriends = data;
    })
  }

  createCommentForm() {
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required ,Validators.maxLength(200)]],
      accountId: [this.account.id],
      postId: ['']
    });
  }

  submitFormCreate() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.formGroup.value.postId = this.idPost;
      this.accountWallAboutService.saveComment(this.formGroup.value).subscribe(data => {
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

  getLinkAccount(id: number) {
    this.router.navigate(['/account-wall', id, 'wall']);
    this.ngOnInit();
    this.loadScript();
  }
}
