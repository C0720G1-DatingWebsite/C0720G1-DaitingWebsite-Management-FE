import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountWallAboutComponent } from './account-wall-about/account-wall-about.component';
import {AccountWallAboutRoutingModule} from "./account-wall-about-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentModule} from "./account-wall-about/comment/comment.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AccountWallAboutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountWallAboutRoutingModule,
    CommentModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ]
})
export class AccountWallAboutModule { }
