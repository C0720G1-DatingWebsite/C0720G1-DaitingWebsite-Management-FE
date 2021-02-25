import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {Router} from "@angular/router";
import {ChangePasswordService} from "../change-password.service";
import {FormGroup} from "@angular/forms";
import {IAccountDTO} from "../IAccountDTO";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public check: boolean = false;
  private account: IAccountDTO;
  private newPassword: string;
  private oldPassword: string;
  constructor(private loadResourceService:LoadResourceService,
              private router: Router,
              private changePasswordService: ChangePasswordService
             ) {
    this.changePasswordService.findAccountDTOById(4).subscribe((data) =>{
      console.log("Tin Change Password");
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
    setTimeout( () => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    },200)
  }

  checkPassword(value: string) {
    this.oldPassword = value;
    this.changePasswordService.checkPassword(this.account.idAccount,value).subscribe((data :boolean)=>{
      this.check = data;
    });

  }

  newPass(value: string) {
    this.newPassword = value
  }

  againPassword(value: string) {
    if(value === this.newPassword){
      this.check = true;
    }
  }

  savePassword() {
    if(this.changePasswordService.checkPassword(this.account.idAccount,this.oldPassword).subscribe){
      this.changePasswordService.changePassword(this.account.idAccount,this.newPassword).subscribe((data)=>{
        console.log(data);
        this.router.navigateByUrl('');
      }, error=>{
        this.router.navigateByUrl('change-password');
      });
    }
  }
}
