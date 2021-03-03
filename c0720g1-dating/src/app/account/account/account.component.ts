import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadResourceService} from "../../load-resource.service";
import {RegisterService} from "../../../service/register.service";

import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']

})
@Injectable({
  providedIn: 'root'
})
export class AccountComponent implements OnInit {
  formGroup: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSubmited = false;
  formValid = false;

  constructor(private loadResourceService: LoadResourceService,
              private formBuild: FormBuilder,
              private router: Router,
              private registerService: RegisterService
  ) {
    this.loadScript()
  }

  validation_messages = {
    'username': [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'minlength', message: 'Tên đăng nhập nhiều hơn 6 ký tự'},
    ],
    'password': [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'minlength', message: 'Tên đăng nhập nhiều hơn 8 ký tự'},
    ],
  };

  ngOnInit(): void {
    this.formGroup = this.formBuild.group({
        userName: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      dateOfBirth: '',
      gender:1
      }
    );
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
  onSubmit() {
    var a = this.formGroup.value;
    console.log(a);
      this.isSubmited = true;
      this.registerService.register(this.formGroup.value).subscribe(data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl("/information")
      });


  }
}
