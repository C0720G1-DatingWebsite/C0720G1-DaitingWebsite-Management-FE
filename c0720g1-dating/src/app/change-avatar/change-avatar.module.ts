import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import {ChangeAvatarRoutingModule} from "./change-avatar-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ChangeAvatarComponent],
  imports: [
    CommonModule,
    ChangeAvatarRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ]
})
export class ChangeAvatarModule { }
