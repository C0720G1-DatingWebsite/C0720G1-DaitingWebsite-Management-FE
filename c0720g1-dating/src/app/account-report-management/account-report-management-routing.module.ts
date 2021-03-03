import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdvanceSearchComponent} from "../account-search/advance-search/advance-search.component";
import {ListMemberComponent} from "./list-member/list-member.component";
import {ReportMemberListComponent} from "./report-member-list/report-member-list.component";
import {GetFeedbackComponent} from "./get-feedback/get-feedback.component";



const routes: Routes = [
  {path: 'member', component: ListMemberComponent},
  {path: 'report-member-list/:id', component: ReportMemberListComponent},
  {path: 'get-feedback', component: GetFeedbackComponent},
  {path: 'send-report-feedback-account', component: ListMemberComponent}
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportManagementRoutingModule { }
