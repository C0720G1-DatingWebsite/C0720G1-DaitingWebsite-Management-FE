import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {BlockAccountComponent} from "./block-account/block-account.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangedPasswordComponent} from "./changed-password/changed-password.component";
import {CheckLoginGuard} from "../security/check-login.guard";


/**
 * PhuocTC
 **/

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [CheckLoginGuard]},
  {path: "block", component: BlockAccountComponent},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "changed-password/:code", component: ChangedPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
