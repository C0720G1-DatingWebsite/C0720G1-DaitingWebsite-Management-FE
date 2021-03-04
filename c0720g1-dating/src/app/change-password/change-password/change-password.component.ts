import {Component, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChangePasswordService} from "../change-password.service";
import {IAccountDTO} from "../IAccountDTO";
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public check: boolean = true;
  public checkNewPass: boolean = true;
  private account: IAccountDTO;
  public newPassword: string = "";
  public oldPassword: string = '';
  private id: number;
  constructor(private loadResourceService: LoadResourceService,
              private router: Router,
              private changePasswordService: ChangePasswordService,
              public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe((data)=>{
      this.id = Number(data.get('idAccount'))
    });
    this.changePasswordService.findAccountDTOById(this.id).subscribe((data) => {
      console.log(data);
      this.account = data;
    });
    this.loadScript()
  }
  ngOnInit(): void {
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
  checkPassword(value: string) {
    this.oldPassword = value;
    this.changePasswordService.checkPassword(this.account.idAccount,value).subscribe((data)=>{
      this.check = data;
    })
  }
  againPassword(value: string) {
    if (value !== this.newPassword) {
      this.checkNewPass = false;
    }else {
      this.checkNewPass = true;
    }
  }
  savePassword() {
    this.changePasswordService.checkPassword(this.account.idAccount, this.oldPassword).subscribe((data) => {
      if (data == true) {
        this.changePasswordService.changePassword(this.account.idAccount, this.newPassword).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('');
        })
      } else {
        this.router.navigateByUrl('change-password')
      }
    })
  }
  exit() {
    this.router.navigateByUrl('');
  }
}
