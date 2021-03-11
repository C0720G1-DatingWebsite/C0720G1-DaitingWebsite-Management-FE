import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../entity/post";
import {AccountWallAboutService} from "../account-wall-about.service";
import {LoadResourceService} from "../../load-resource.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageManager} from "../message-manager";
import {StorageService} from "../../security/storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-page-list',
  templateUrl: './post-page-list.component.html',
  styleUrls: ['./post-page-list.component.scss']
})
export class PostPageListComponent implements OnInit {
  page: number = 0;
  pageable: any;
  size: number = 2;
  iPosts: IPost[];
  @Input() idAccountPost;
  formGroup: FormGroup;
  account;
  idPost: number;
  idComment: number;
  flagComment = false;

  constructor(private accountWallAboutService: AccountWallAboutService,
              private loadResourceService: LoadResourceService,
              private formBuilder: FormBuilder,
              public messageManager: MessageManager,
              public toastrService: ToastrService,
              private storageService: StorageService,) {this.loadScript(); }

  ngOnInit(): void {
    this.getAllPost();
    this.createCommentForm();
  }
  getAllPost() {
    this.accountWallAboutService.getAllPost(this.page, this.size, this.idAccountPost).subscribe((data) => {
      this.iPosts = data.content;
      console.log('post')
      console.log(data.content)
    });
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
}
