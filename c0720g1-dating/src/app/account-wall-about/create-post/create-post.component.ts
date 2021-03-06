import {Component, Inject, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {CreatePostService} from "../create-post.service";
import {IStatus} from "../../entity/status";
import {FormControl, FormGroup} from "@angular/forms";
import {StorageService} from "../../security/storage.service";
import {IPolicy} from "../../entity/policy";
import {AngularFireStorage} from "@angular/fire/storage";
import {UploadFireService} from "../../../upload-fire-service/upload-fire.service";
import {finalize} from "rxjs/operators";
import {IPost} from "../../entity/post";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  image: string = '';
  checkImage: boolean = false;
  formCreatePost: FormGroup;
  listPolicy: IPolicy[] = [];
  check: boolean = true;
  selectedImage: any = null;
  url: string;
  idProject: string = 'project-dating-c8c29';
  file: string;
  user;
  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              @Inject(UploadFireService) private uploadFileService: UploadFireService,
              private loadResourceService: LoadResourceService,
              private createPostService: CreatePostService,
              private storageService: StorageService) {

    this.createPostService.getAllPolicy().subscribe((data) => {
      this.listPolicy = data;
      console.log(data);
    });
    this.uploadFileService.getImageDetailList();
    this.loadScript()
  }

  ngOnInit(): void {
    this.user = this.storageService.getUser().fullName;
    this.formCreatePost = new FormGroup({
      idAccount: new FormControl(this.storageService.getUser().id),
      contentPost: new FormControl(''),
      idPolicy: new FormControl(1),
      imagePost: new FormControl('')
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
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    }, 200)
  }

  savePost() {
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.uploadFileService.insertImageDetails(this.idProject, this.url);
          console.log(this.url);
          this.formCreatePost.value.imagePost = this.url;
          console.log(this.formCreatePost.value);
          this.createPostService.createPost(this.formCreatePost.value).subscribe(data=>{
            if (data){
              window.location.reload();
            }else {
              alert("Fail !");
            }
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.image = event.target.result
      }
      this.checkImage = true;
    }
    this.selectedImage = event.target.files[0];
    this.url = this.selectedImage + Date.now();
    console.log(this.url);
  }


  chooseImage(){
    document.getElementById('chooseImage').click();
  }
}
