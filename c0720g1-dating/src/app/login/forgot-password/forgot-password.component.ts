import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formForgotPassword: FormGroup;


  constructor(private loadResourceService: LoadResourceService,
              private toastrService: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService) {
    this.loadResourceService.loadScript('src/assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('src/assets/js/landing/landing.tabs.js');
    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
    this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
    this.loadResourceService.loadScript('assets/js/global/global.popups.js');
    this.loadResourceService.loadScript('assets/js/header/header.js');
    this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    this.loadResourceService.loadScript('assets/js/content/content.js');
    this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    this.loadResourceService.loadScript('assets/js/global/global.accordions.js');

  }

  ngOnInit(): void {
    this.formForgotPassword = this.fb.group({
      userName: ['']
    });
  }

  submit() {


    this.loginService.forgotPassword(this.formForgotPassword.value.userName).subscribe(data => {
      console.log(data);
      this.toastrService.warning('Vào Email của bạn để lấy lại mật khẩu');
      this.router.navigateByUrl('/login')
    }, error => {
      console.log(error);
      this.toastrService.error('Tài khoản email của bạn không tồn tại');
    })

  }
}
