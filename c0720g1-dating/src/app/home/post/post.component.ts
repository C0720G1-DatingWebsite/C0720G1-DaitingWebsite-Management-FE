import {Component, Inject, OnInit} from '@angular/core';
import {IPost} from "../../entity/post";
import {FormBuilder, FormGroup} from "@angular/forms";
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

  constructor(private loadResourceService: LoadResourceService,
              private postServiceService: PostServiceService,
              private storageService: StorageService,
              private formBuilder: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              @Inject(UploadFireService) private uploadFileService: UploadFireService,
              private toastr: ToastrService) {
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


  }

  getIdAccount() {
    return this.storageService.getUser().id;
  }

  increaseLike(idPost) {
    this.postServiceService.getAllAccountPost().subscribe(data => {
      this.accountPost = data
      let check = true;
      for (let i = 0; i < this.accountPost.length; i++) {
        if (idPost === data[i].post.id && this.getIdAccount() === data[i].account.id) {
          this.postServiceService.reductionLike(idPost, data[i].id).subscribe(data => {
            this.getListPost();
            this.loadResourceService.loadScript('assets/js/content/content.js');
          })
          check = true;
          break;
        } else {
          check = false;
        }
      }
      if (check == false) {
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

  editPost() {

  }

  onScroll() {
    this.loadScript();
    this.checkLoading = true;
    this.size += 2;
    this.getListPost();
  }

  editViewPost(object: any) {

    this.image = object.imagePost;
    this.booleanEdit = true;
    this.id = object.id;
    this.object = object;

    this.postEditForm = this.formBuilder.group({
      id: [object.id],
      content: [object.content],
      imagePost: [object.image],
      postTime: [object.postTime],
      likeCount: [object.likeCount],
      account: [object.account],
      group: [object.group],
      policy: [object.policy]
    })
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
            this.post.imagePost = this.url;
            console.log(this.post.imagePost);
            console.log(this.post)
            this.postServiceService.editPost(this.post).subscribe(data => {
              this.toastr.success('Sửa Thành Công','thông báo')
              this.booleanEdit = false;
              // this.ngOnInit();
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
}
