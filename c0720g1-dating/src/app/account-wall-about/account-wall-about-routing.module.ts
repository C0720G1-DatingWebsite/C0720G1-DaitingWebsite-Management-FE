import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AccountWallAboutComponent} from "./account-wall-about/account-wall-about.component";
import {ChangeAccountComponent} from "./change-account/change-account.component";

const routes: Routes = [
  {path: 'account-wall', redirectTo: 'account-wall', pathMatch: 'full'},
  {path: 'account-wall/:idAccount/wall', component: AccountWallAboutComponent},
  {path: 'account-wall/:idAccount/update', component: ChangeAccountComponent}
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountWallAboutRoutingModule { }
