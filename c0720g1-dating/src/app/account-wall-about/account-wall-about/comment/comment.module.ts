import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ReplyComponent } from './reply/reply.component';
import {CommentRoutingModule} from "./comment-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [CommentListComponent, ReplyComponent],
  exports: [
    CommentListComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ]
})
export class CommentModule { }
