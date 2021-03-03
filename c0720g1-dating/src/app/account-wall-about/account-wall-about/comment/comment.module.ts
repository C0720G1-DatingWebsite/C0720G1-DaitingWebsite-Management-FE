import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ReplyComponent } from './reply/reply.component';
import {CommentRoutingModule} from "./comment-routing.module";

@NgModule({
  declarations: [CommentListComponent, ReplyComponent],
  exports: [
    CommentListComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule
  ]
})
export class CommentModule { }
