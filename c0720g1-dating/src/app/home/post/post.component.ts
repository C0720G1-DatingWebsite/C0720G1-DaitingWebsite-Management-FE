import {Component, Inject, OnInit} from '@angular/core';
import {IPost} from "../../entity/post";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostServiceService} from "../post-service.service";
import {LoadResourceService} from "../../load-resource.service";
import {StorageService} from "../../security/storage.service";
import {Router} from "@angular/router";
import {IAccountPost} from "../../entity/account_post";
import {AngularFireStorage} from "@angular/fire/storage";

import {finalize} from "rxjs/operators";
import {IPolicy} from "../../entity/policy";
import {ToastrService} from "ngx-toastr";
import {UploadFireService} from "../../../upload-fire-service/upload-fire.service";
import {IAccount} from "../../entity/account";
import {MessageManager} from "../../account-wall-about/message-manager";
import {AccountWallAboutService} from "../../account-wall-about/account-wall-about.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
/** LuyenNT
 */
export class PostComponent implements OnInit {
  selectedImage: any = null;
  checkLoading: boolean = false;
  url: string;
  object: IPost;
  idProject: string = 'project-dating-c8c29';
  file: string;
  public iPosts: IPost[] = [];
  public accountPost: IAccountPost[];
  size = 3;
  booleanEdit = false;
  public id: number = -1;
  public post: IPost;
  postEditForm: FormGroup;
  public dtoPolicy: IPolicy[];
  public image: string = '';
  checkEnd: boolean = false;

  iAccount: IAccount;
  account;
  formGroup: FormGroup;
  flagComment = false;
  idPost: number;
  idComment: number;

  constructor(private loadResourceService: LoadResourceService,
              private postServiceService: PostServiceService,
              private storageService: StorageService,
              private accountWallAboutService: AccountWallAboutService,
              private formBuilder: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              @Inject(UploadFireService) private uploadFileService: UploadFireService,
              private toastr: ToastrService,
              public messageManager: MessageManager,) {
    this.uploadFileService.getImageDetailList();
    this.loadScript();
  }

  showPreview(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.image = event.target.result
      }
    }
    this.selectedImage = event.target.files[0];
    this.url = this.selectedImage;
  }

  ngOnInit(): void {
    this.getListPolicy();
    this.getListPost();
    this.account = this.storageService.getUser();
    this.createCommentForm();

  }

  getIdAccount() {
    return this.storageService.getUser().id;
  }

  increaseLike(idPost) {
    this.postServiceService.getAllAccountPost().subscribe(data => {
      this.accountPost = data;
      let check = true;
      for (let i = 0; i < this.accountPost.length; i++) {
        if (idPost === data[i].post.id && this.getIdAccount() === data[i].account.id) {
          console.log('giam')
          this.postServiceService.reductionLike(idPost, data[i].id).subscribe(data => {
            this.getListPost();
            this.loadResourceService.loadScript('assets/js/content/content.js');
          });
          check = true;
          break;
        } else {
          check = false;
        }
      }
      if (check == false) {
        console.log('tang')
        this.postServiceService.increaseLike(this.getIdAccount(), idPost).subscribe(data => {
          this.getListPost();
          this.loadResourceService.loadScript('assets/js/content/content.js');

        })
      }
    })
  }

  getListPolicy() {
    this.postServiceService.getAllPolicy().subscribe(data => {
      this.dtoPolicy = data;
      console.log(this.dtoPolicy);
    })
  }

  getListPost() {
    let s = this.storageService.getUser().id;
    this.postServiceService.getListPost(s, this.size).subscribe(data => {
      this.loadScript();
      // let that = this;
      this.iPosts = data;
      // setTimeout(function (){
      //   if (that.iPosts.length == data.length){
      //     that.checkLoading = false;
      //   }else {
      //     that.iPosts = data;
      //     that.checkLoading = false;
      //   }
      // },1000);


    }, error => console.log(error));
  }

  loadScript(){
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

  onScroll() {
    this.loadScript();
    this.checkLoading = true;
    this.size += 2;
    this.getListPost();
  }

  editViewPost(object: any) {

    this.image = object.image;
    this.booleanEdit = true;
    this.id = object.id;
    this.object = object;

    this.postEditForm = this.formBuilder.group({
      id: [object.id],
      content: [object.content],
      image: [object.image],
      postTime: [object.postTime],
      likeCount: [object.likeCount],
      account: [object.account],
      group: [object.group],
      policy: [object.policy]
    });
    this.loadScript();
  }

  show(event: any) {
    this.selectedImage = event.target.files[0];
    this.url = this.selectedImage + Date.now();
  }

  save() {
    console.log('dsfsdfsdfsdfsdfsdfsd')
    console.log(this.postEditForm.value)
    if (this.selectedImage !== null) {
      console.log('kkkkk')
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.uploadFileService.insertImageDetails(this.idProject, this.url);
            this.post = this.postEditForm.value;
            this.post.image = this.url;
            console.log(this.post.image);
            console.log(this.post)
            this.postServiceService.editPost(this.post).subscribe(data => {
              this.toastr.success('Sửa Thành Công','thông báo')
              this.booleanEdit = false;
              this.ngOnInit();
            })
          });
        })
      ).subscribe();

    } else {
      console.log('alo alo')
      console.log(this.dtoPolicy)
      this.postServiceService.editPost(this.postEditForm.value).subscribe(data => {
        this.toastr.success('Sửa Thành Công','THÔNG BÁO');
        this.booleanEdit = false;
        this.ngOnInit();
      })
    }
  }

  cancel() {
    this.booleanEdit = false;
    this.ngOnInit();
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
        this.toastr.success('Đăng bình luận thành công!', 'Thông báo')
      });
    }
  }

  getDeleteCommentById(idComment: number) {
    this.accountWallAboutService.deleteComment(idComment).subscribe(data => {
      this.ngOnInit();
      this.toastr.success('Xóa bình luận thành công!', 'Thông báo')
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
