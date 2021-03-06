import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountWallAboutComponent } from './account-wall-about/account-wall-about.component';
import {AccountWallAboutRoutingModule} from "./account-wall-about-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommentListComponent} from "./comment-list/comment-list.component";
import {ReplyComponent} from "./reply/reply.component";
import { ReplyReplyComponent } from './reply-reply/reply-reply.component';
import {CreatePostComponent} from "./create-post/create-post.component";


@NgModule({
  declarations: [AccountWallAboutComponent, CommentListComponent, ReplyComponent, ReplyReplyComponent, CreatePostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountWallAboutRoutingModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ]
})
export class AccountWallAboutModule { }
