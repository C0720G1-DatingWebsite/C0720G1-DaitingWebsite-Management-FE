import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ChangeAvatarComponent} from "./change-avatar/change-avatar.component";

const routes: Routes = [
  {path:'change-avatar/:idAccount', component: ChangeAvatarComponent}
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeAvatarRoutingModule { }
