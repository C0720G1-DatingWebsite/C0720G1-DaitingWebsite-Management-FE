import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberComponent } from './list-member/list-member.component';
import {AccountReportManagementRoutingModule} from "./account-report-management-routing.module";
import { ReportMemberListComponent } from './report-member-list/report-member-list.component';
import { SendReportComponent } from './send-report/send-report.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ListMemberComponent, ReportMemberListComponent, SendReportComponent],
  imports: [
    CommonModule,
    AccountReportManagementRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountReportManagementModule { }
