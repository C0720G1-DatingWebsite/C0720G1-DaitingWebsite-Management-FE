import { Component, OnInit } from '@angular/core';
import {IPost} from "../../entity/post";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostServiceService} from "../post-service.service";
import {LoadResourceService} from "../../load-resource.service";
import {StorageService} from "../../security/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
/** LuyenNT
 */
export class PostComponent implements OnInit {

  public iPosts: IPost[];
  public formGroup : FormGroup;

  constructor( private loadResourceService : LoadResourceService,
               private postServiceService : PostServiceService,
               private storageService : StorageService,
               private formBuilder: FormBuilder,
               private router: Router) {
    this.loadScript();
  }

  ngOnInit(): void {
    this.getListPost();
    this.formGroup = this.formBuilder.group({
      id:[this.storageService.getUser().id],
      content: [''],
      postTime: [''],
      likeCount: [''],
      policy: [''],
      account: [''],
      group: [''],
      customerViewList: [''],
      commentList: ['']
    })
  }

  increaseLike(){
    let s = this.storageService.getUser().id;
    this.postServiceService.increaseLike(s);
  }

  getListPost(){
    let s = this.storageService.getUser().id;
    this.postServiceService.getListPost(s).subscribe(data => {
      console.log(s)
      this.iPosts = data;
      console.log(this.iPosts)
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
    setTimeout( () => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    },200)
  }


}
