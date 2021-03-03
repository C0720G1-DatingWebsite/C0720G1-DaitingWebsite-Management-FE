import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ChangePasswordRoutingModule} from "./change-password-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    ChangePasswordRoutingModule,
    FormsModule
  ]
})
export class ChangePasswordModule { }
