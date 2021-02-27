import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountWallAboutComponent } from './account-wall-about/account-wall-about.component';
import {AccountWallAboutRoutingModule} from "./account-wall-about-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [AccountWallAboutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountWallAboutRoutingModule,
  ]
})
export class AccountWallAboutModule { }
