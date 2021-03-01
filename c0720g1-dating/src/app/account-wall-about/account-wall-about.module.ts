import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountWallAboutComponent } from './account-wall-about/account-wall-about.component';
import {AccountWallAboutRoutingModule} from "./account-wall-about-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentModule} from "./account-wall-about/comment/comment.module";
import { CommentEditComponent } from './account-wall-about/comment-edit/comment-edit.component';

@NgModule({
  declarations: [AccountWallAboutComponent, CommentEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountWallAboutRoutingModule,
    CommentModule
  ]
})
export class AccountWallAboutModule { }
