import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberComponent } from './list-member/list-member.component';
import {AccountReportManagementRoutingModule} from "./account-report-management-routing.module";
import { ReportMemberListComponent } from './report-member-list/report-member-list.component';
import { SendReportComponent } from './send-report/send-report.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { GetFeedbackComponent } from './get-feedback/get-feedback.component';



@NgModule({
  declarations: [ListMemberComponent, ReportMemberListComponent, SendReportComponent, GetFeedbackComponent],
  imports: [
    CommonModule,
    AccountReportManagementRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class AccountReportManagementModule { }
