import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreatePostComponent} from "./create-post/create-post.component";

const routes: Routes =[
  {path: 'create-post',component: CreatePostComponent}
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePostRoutingModule { }
