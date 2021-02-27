import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdvanceSearchComponent} from "../account-search/advance-search/advance-search.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


const routes: Routes = [
  {path: 'change-password', component: ChangePasswordComponent},
];


@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
