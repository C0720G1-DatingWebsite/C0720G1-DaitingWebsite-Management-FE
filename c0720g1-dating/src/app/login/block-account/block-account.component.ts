import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../login.service";
import {StorageService} from "../../security/storage.service";
import {Router} from "@angular/router";
import {LoadResourceService} from "../../load-resource.service";


/**
 * PhuocTC
 **/

@Component({
  selector: 'app-block-account',
  templateUrl: './block-account.component.html',
  styleUrls: ['./block-account.component.scss']
})
export class BlockAccountComponent implements OnInit {

  constructor(private loadResourceService: LoadResourceService) {
    this.loadResourceService.loadScript('src/assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('src/assets/js/landing/landing.tabs.js');

    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');

  }

  ngOnInit(): void {
  }

}
