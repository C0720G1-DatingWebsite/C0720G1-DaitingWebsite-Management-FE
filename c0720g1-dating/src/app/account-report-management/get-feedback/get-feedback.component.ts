import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {GetFeedbackDTO} from "../../entity/GetFeedbackDTO";
import {MemberReportService} from "../member-report.service";

@Component({
  selector: 'app-get-feedback',
  templateUrl: './get-feedback.component.html',
  styleUrls: ['./get-feedback.component.scss']
})
export class GetFeedbackComponent implements OnInit {
  getFeedbackList: GetFeedbackDTO[];
  constructor(private loadResourceService: LoadResourceService,
              private memberReportService: MemberReportService) { }

  ngOnInit(): void {
    this.loadScript();
    this.memberReportService.findAllFeedback().subscribe(data =>{
      this.getFeedbackList = data;
    });
  }
  loadScript() {
    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    this.loadResourceService.loadScript('assets/js/global/global.accordions.js');
    setTimeout( () => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/global/global.popups.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    },200)
  }
}
