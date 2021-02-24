import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {BlockAccountComponent} from "./block-account/block-account.component";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "block", component: BlockAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
