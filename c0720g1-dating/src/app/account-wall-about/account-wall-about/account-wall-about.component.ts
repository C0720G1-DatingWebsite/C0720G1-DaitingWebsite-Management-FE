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
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-account-wall-about',
  templateUrl: './account-wall-about.component.html',
  styleUrls: ['./account-wall-about.component.scss']
})
export class AccountWallAboutComponent implements OnInit, AfterViewChecked {
  id: number;
  iAccount: IAccount;
  page: number = 0;
  iPosts: IPost[];
  iAccountGroups: IAccountGroup[] =[];
  iFriends: IFriend[] =[];
  formGroup: FormGroup;
  idPost: number;
  account;
  public show:boolean = false;
  public buttonName:any = 'Show';
  loading= false;

  constructor(private route: ActivatedRoute,
              private accountWallAboutService: AccountWallAboutService,
              private storageService: StorageService,
              private loadResourceService: LoadResourceService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.loadScript()
  }


  ngOnInit(): void {
    this.loading = true;
    this.getFindById();
    this.account = this.storageService.getUser();
    this.createCommentForm();
    console.log(this.account)
  }

  showComment = {
    show: false,
    current: false,
    next: false
  };

  getFindById() {
    this.id = this.route.snapshot.params['idAccount'];
    this.accountWallAboutService.findById(this.id).subscribe((data: IAccount) => {
      this.iAccount = data;
      console.log(data);
      this.getAllPost();
      this.getAllGroup();
      this.getAllFriend();
    });
  }

  getAllPost() {
    this.accountWallAboutService.getAllPost(this.page, this.id).subscribe((data) => {
      this.iPosts = data.content;
      console.log('danh sách post');
      console.log(data.content);
    });
  }

  getAllGroup() {
    this.accountWallAboutService.getAllGroup(this.id).subscribe((data: IAccountGroup[]) => {
      this.iAccountGroups = data;
      console.log('danh sách group');
      console.log(data);
      // console.log(data[0].userGroup);
    })
  }

  getAllFriend() {
    this.accountWallAboutService.getAllFriend(this.id).subscribe((data: IFriend[]) => {
      this.iFriends = data;
      console.log('danh sách friend');
      console.log(data);
    })
  }

  createCommentForm() {
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      postId: ['']
    });
  }

  submitForm() {
    this.formGroup.value.postId = this.idPost;
    this.accountWallAboutService.saveComment(this.formGroup.value).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
    this.ngOnInit();
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

  ngAfterViewChecked(): void {

    if (this.iAccount.avatar) {
      document.getElementById(this.iAccount.userName).setAttribute('data-src', this.iAccount.avatar);
    } else {
      document.getElementById(this.iAccount.userName).setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
    }

    for (let i = 0; i < this.iPosts.length; i++) {
      let idTemp = this.iAccount.userName + i;
      if (this.iAccount.avatar) {
        document.getElementById(idTemp).setAttribute('data-src', this.iAccount.avatar);
      } else {
        document.getElementById(idTemp).setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
      }
    }
    for (let i = 0; i < this.iFriends.length; i++) {
      let idTemp = this.iAccount.userName + i;
      if (this.iAccount.avatar) {
        document.getElementById(idTemp).setAttribute('data-src', this.iAccount.avatar);
      } else {
        document.getElementById(idTemp).setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
      }
    }
    for (let i = 0; i < this.iAccountGroups.length; i++) {
      let idTemp = this.iAccount.userName + i;
      if (this.iAccount.avatar) {
        document.getElementById(idTemp).setAttribute('data-src', this.iAccount.avatar);
      } else {
        document.getElementById(idTemp).setAttribute('data-src', 'https://i.pinimg.com/originals/b4/52/4b/b4524b0e1c6173892715e952b10adbce.jpg');
      }
    }
  }

  getIdPost(id: any) {
    for (let i = 0; i < this.iPosts.length; i++) {
      if (this.iPosts[i].id == parseInt(id)) {
        this.idPost = this.iPosts[i].id;
      }
    }
  }

  abc(id: number) {
    this.router.navigate(['/account-wall', id ,'wall']);
    this.ngOnInit();
  }
}
