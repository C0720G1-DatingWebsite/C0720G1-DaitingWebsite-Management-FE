import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePostRoutingModule} from "./create-post-routing.module";
import {RouterModule} from "@angular/router";
import {CreatePostComponent} from './create-post/create-post.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [CreatePostComponent],
  exports: [
    CreatePostComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CreatePostRoutingModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class CreatePostModule {
}
