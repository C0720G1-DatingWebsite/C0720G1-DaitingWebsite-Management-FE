import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ChangePasswordRoutingModule} from "./change-password-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ChangePasswordRoutingModule
  ]
})
export class ChangePasswordModule { }
