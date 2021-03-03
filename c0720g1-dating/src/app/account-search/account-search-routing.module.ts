import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdvanceSearchComponent} from './advance-search/advance-search.component';
import {UserGuard} from "../security/user.guard";

const routes: Routes = [
  {path: '', component: AdvanceSearchComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountSearchRoutingModule { }
