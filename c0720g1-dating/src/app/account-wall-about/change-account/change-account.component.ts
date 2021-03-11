import {Component, OnInit} from '@angular/core';
import {IAccount} from "../../entity/account";
import {ICity} from "../../entity/city";
import {ICountry} from "../../entity/country";
import {IJob} from "../../entity/job";
import {IMaritalStatus} from "../../entity/marital-status";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateAccountService} from "../update-account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../security/storage.service";
import {ToastrService} from "ngx-toastr";
import {MessageManager} from "../message-manager";

@Component({
  selector: 'app-change-account',
  templateUrl: './change-account.component.html',
  styleUrls: ['./change-account.component.scss']
})
export class ChangeAccountComponent implements OnInit {

  idAccount: number;
  iAccount: IAccount;
  cityList: ICity[] = [];
  countryList: ICountry[] = [];
  jobList: IJob[] = [];
  maritalStatusList: IMaritalStatus[] = [];
  formGroup: FormGroup;
  defaultValue = false;
  account;


  constructor(public formBuilder: FormBuilder,
              private storageService: StorageService,
              public messageManager: MessageManager,
              public route: ActivatedRoute,
              public router: Router,
              public updateAccountService: UpdateAccountService) {
  }

  ngOnInit(): void {
    this.account = this.storageService.getUser();
    this.getAllCity();
    this.getAllCountry();
    this.getAllJob();
    this.getAllMaritalStatus();
    this.updateAccountService.findByIdAccount(this.account.id).subscribe((data: IAccount) => {
      this.iAccount = data;
      console.log('taif khoan muon doi');
      console.log(data);
      this.formGroup = this.formBuilder.group({
        id: [this.iAccount.id],
        accountDescribe: [this.iAccount.accountDescribe, Validators.required, Validators.maxLength(200)],
        address: [this.iAccount.address, Validators.required, Validators.maxLength(100)],
        fullName: [this.iAccount.fullName, Validators.required],
        dateOfBirth: [this.iAccount.dateOfBirth, Validators.required],
        gender: [this.iAccount.gender, Validators.required],
        cityId: [this.iAccount.city.id, Validators.required],
        countryId: [this.iAccount.country.id, Validators.required],
        jobId: [this.iAccount.job.id, Validators.required],
        maritalStatusId: [this.iAccount.maritalStatus.id, Validators.required],
        audience:[this.iAccount.audience, [Validators.required]],
        email: [this.iAccount.email, Validators.required]
      });
      this.defaultValue = true;
    })

  }

  getAllCity() {
    this.updateAccountService.getAllCity().subscribe((data: ICity[]) => {
      this.cityList = data;
    });
  };

  getAllCountry() {
    this.updateAccountService.getAllCountry().subscribe((data: ICountry[]) => {
      this.countryList = data;
    });
  };

  getAllJob() {
    this.updateAccountService.getAllJob().subscribe((data: IJob[]) => {
      this.jobList = data;
    });
  };

  getAllMaritalStatus() {
    this.updateAccountService.getAllMaritalStatus().subscribe((data: IMaritalStatus[]) => {
      this.maritalStatusList = data;
    });
  };

  submitForm() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      console.log('Nội dung thay đồi')
      console.log(this.formGroup.value);
      this.updateAccountService.editAccount(this.account.id, this.formGroup.value).subscribe(data => {
        if (data === null) {
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.router.navigateByUrl('/account-wall/' + this.account.id +'/wall');
          // this.messageManager.showMessageEdit();
        }
      });
    }
  }
}
