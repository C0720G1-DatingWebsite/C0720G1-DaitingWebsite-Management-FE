import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-changed-password',
  templateUrl: './changed-password.component.html',
  styleUrls: ['./changed-password.component.scss']
})
export class ChangedPasswordComponent implements OnInit {

  formChangedPassword: FormGroup;

  vetifyCode;

  constructor(private loadResourceService: LoadResourceService,
              private loginService: LoginService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private toastrService: ToastrService) {
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

    this.checkVetifyCode();

    this.formChangedPassword = this.fb.group({
      newPassword: [''],
      repeatPassword: ['']
    });
  }

  checkVetifyCode() {
    this.route.paramMap.subscribe(param => {
      this.vetifyCode = param.get('code');
      this.loginService.checkVetifyCode(this.vetifyCode).subscribe(data => {
      }, error => {
        this.router.navigateByUrl('/login');
      });
    })
  }

  submit() {

    if (this.formChangedPassword.invalid) {

    } else {
      this.loginService.changedPassword(this.vetifyCode, this.formChangedPassword.value.newPassword).subscribe(data => {
        this.toastrService.success('Đổi mật khẩu thành công');
        this.router.navigateByUrl('/login')
      }, error => {
        this.toastrService.error('Đổi mật khẩu thất bại');
      });
    }


  }
}
