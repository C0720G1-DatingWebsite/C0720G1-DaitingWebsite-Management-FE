import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {InformationService} from "../../../service/information.service";
import {LoadResourceService} from "../../load-resource.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  formGroup: FormGroup;
  id;

  constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private informationService: InformationService,
     private loadResourceService: LoadResourceService,

  ) {
    this.loadScript() }



  ngOnInit(): void {
    this.loadScript();
    this.formGroup = this.formBuilder.group({
      id:[''],
      fullName: new FormControl([Validators.required, Validators.maxLength(255), Validators.minLength(1)]),
      address: new FormControl([Validators.maxLength(200)]),
      country: new FormControl([Validators.required]),
      city: new FormControl([Validators.required]),
      job: new FormControl([Validators.required]),
      audience: new FormControl([Validators.required]),
      accountDescribe: new FormControl([Validators.maxLength(2000)])
    });
    this.informationService.getInformationById(this.route.snapshot.paramMap.get('id')).subscribe(data =>{
        console.log(this.formGroup.patchValue(data));
        console.log(data)
    });
  }

  updateInformation(){
    console.log(this.formGroup.value.id);
    this.informationService.information(this.formGroup.value, this.formGroup.value.id).subscribe(data =>{
      this.router.navigateByUrl('/')
    })
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
  validation_messages = {
    fullName: [
      { type: 'required', message: 'Vui lòng nhập tên' },
      { type: 'maxlength', message: 'Vui lòng nhập tên không quá 40 kí tự.' },
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 6 kí tự' },
      {type: 'pattern', message: 'Vui lòng nhập tên đúng'}
    ],

    address: [
      { type: 'maxlength', message: 'Vui lòng nhập địa chỉ không quá 100 kí tự' },
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 6 kí tự' },
      {type: 'pattern', message: 'Vui lòng nhập địa chỉ đúng'}
    ],
    country: [
      { type: 'required', message: 'Vui lòng chọn quốc gia' },
    ],
    city: [
      { type: 'required', message: 'Vui lòng chọn thành phố' },
    ],
    job: [
      { type: 'required', message: 'Vui lòng chọn nghề nghiệp' },
    ],
    audience: [
      { type: 'required', message: 'Vui lòng chọn đối tượng kết bạn' },
    ],
  };
}
