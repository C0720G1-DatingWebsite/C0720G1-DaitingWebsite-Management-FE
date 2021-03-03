import {Component, Inject, OnInit} from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChangePasswordService} from "../../change-password/change-password.service";
import {IAccountDTO} from "../../change-password/IAccountDTO";
import {AngularFireStorage} from "@angular/fire/storage";
import {UploadFireService} from "../../../upload-fire-service/upload-fire.service";
import {finalize} from "rxjs/operators";
import {ChangeAvatarService} from "../change-avatar.service";

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  check: boolean = false;
  id: number;
  account: IAccountDTO;
  selectedImage: any = null;
  url: string;
  idProject: string = 'project-dating-c8c29';
  file: string;
  constructor(  private loadResourceService:LoadResourceService,
                public activatedRoute: ActivatedRoute,
                private changePasswordService: ChangePasswordService,
                private changeAvatarService: ChangeAvatarService,
                @Inject(AngularFireStorage) private storage: AngularFireStorage,
                private router: Router,
                @Inject(UploadFireService) private uploadFileService: UploadFireService) {
    this.activatedRoute.paramMap.subscribe((data)=>{
      this.id = Number(data.get('idAccount'))
    });
    this.changePasswordService.findAccountDTOById(this.id).subscribe(data=>{
      this.account = data;
      console.log(data);
    });
    this.uploadFileService.getImageDetailList();
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

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.url = this.selectedImage + Date.now();
    console.log(this.url);
    this.check = true;
  }


  saveChange() {
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.uploadFileService.insertImageDetails(this.idProject, this.url);
          console.log(this.url);
          this.changeAvatarService.changeAvatarAccount(this.account.idAccount,this.url).subscribe(data =>{
            if (data){
              window.location.reload();
            }else {
              alert("Fail !");
            }
          })
        });
      })
    ).subscribe();

  }

  exit() {
    this.router.navigateByUrl('');
  }
}
