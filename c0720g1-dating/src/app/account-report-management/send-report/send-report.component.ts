import { Component, OnInit } from '@angular/core';
import {MemberReportService} from "../member-report.service";

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.scss']
})
export class SendReportComponent implements OnInit {

  constructor(
    private memberReportService: MemberReportService
  ) { }

  ngOnInit(): void {
  }

}
