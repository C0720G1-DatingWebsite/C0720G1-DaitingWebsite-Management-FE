import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../login.service";
import {StorageService} from "../../security/storage.service";
import {Router} from "@angular/router";
import {LoadResourceService} from "../../load-resource.service";

declare let FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginRef', {static: true}) loginElement: ElementRef;
  auth2: any;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private storageService: StorageService,
              private router: Router,
              private loadResourceService: LoadResourceService) {
    // this.loadResourceService.loadScript('src/assets/js/utils/app.js');
    // this.loadResourceService.loadScript('src/assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('src/assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('src/assets/js/landing/landing.tabs.js');
    // this.loadResourceService.loadScript('src/assets/js/utils/svg-loader.js');


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
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      rememberMe: [false]
    });

    this.facebookInitialize();
    this.googleInitialize();
  }

  facebookInitialize() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '240263411011145',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  loginForFacebook() {
    FB.login((response) => {
      console.log('submit login', response);
      if (response.authResponse) {
        alert("Successfully");
        console.log(response.authResponse.accessToken);

        let account = {
          userName: response.authResponse.userID,
          password: '',
        };

        this.loginService.loginForFacebook(account).subscribe(data => {
          console.log(data);

          if (this.loginForm.value.rememberMe) {
            this.storageService.saveInLocalStorage(data)
          } else {
            this.storageService.saveInSessionStorage(data);
          }

          console.log(this.storageService.getUser());

          this.router.navigateByUrl('');
        }, error => {
          console.log(error);
        });

      } else {
        alert("Failed");
      }
    });
  }

  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '752965624797-fj45blgnroiu82gj96gpt59iqg2fdsic.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin();
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  prepareLogin() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log(profile);

        let account = {
          userName: profile.kt,
          password: '',
          avatar: profile.vI,
          fullName: profile.sd
        };

        this.loginService.loginForGoogle(account).subscribe(data => {
          console.log(data);

          if (this.loginForm.value.rememberMe) {
            this.storageService.saveInLocalStorage(data)
          } else {
            this.storageService.saveInSessionStorage(data);
          }

          console.log(this.storageService.getUser());

          this.router.navigateByUrl('');
        }, error => {
          console.log(error);
        });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  submitLogin() {
    this.loginService.login(this.loginForm.value).subscribe(data => {

      if (this.loginForm.value.rememberMe) {
        this.storageService.saveInLocalStorage(data);
      } else {
        this.storageService.saveInSessionStorage(data);
      }

      console.log(this.storageService.getUser());

      this.router.navigateByUrl('');

    }, error => {
      this.loginForm = this.fb.group({
        username: [''],
        password: [''],
        rememberMe: [false]
      });

      console.log(error);
    })
  }
}
