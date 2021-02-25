import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoadResourceService} from './load-resource.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'c0720g1-dating';

  constructor(private loadResourceService:LoadResourceService) {


    // this.loadResourceService.loadScript('assets/js/utils/app.js');
    // this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    // this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    // this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    // this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    // // this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    // this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
    // this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
    // this.loadResourceService.loadScript('assets/js/global/global.popups.js');
    // this.loadResourceService.loadScript('assets/js/header/header.js');
    // this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    // this.loadResourceService.loadScript('assets/js/content/content.js');
    // this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    // this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    //
    // this.loadResourceService.loadScript('assets/js/global/global.accordions.js');
  }

  ngOnInit(): void {

  }

}
