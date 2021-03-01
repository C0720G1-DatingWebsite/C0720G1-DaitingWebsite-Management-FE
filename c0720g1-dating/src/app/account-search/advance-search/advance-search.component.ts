import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {SearchTotalService} from "../services/search-total.service";
import {SearchAndPage} from "../dto/SearchAndPage";
import {MemberResultDTO} from "../dto/MemberResultDTO";
import {ICity} from "../../entity/city";

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {

  mainAccountId: number;
  totalResult: number = 0;
  totalDisplayed: number = 0;
  searchData: SearchAndPage = new SearchAndPage();
  cityList: ICity[];
  selectedYear: string = '';
  searchResult: MemberResultDTO[] = [];
  displayList: MemberResultDTO[] = [];


  constructor(private loadResourceService:LoadResourceService,
              private searchTotalService: SearchTotalService) {

    this.loadScript()
  }

  ngOnInit(): void {
    this.getCityList();
  }

  getCityList(): void {
    this.searchTotalService.getCityList().subscribe( data => {
      this.cityList = data;
      console.log(this.cityList)
    })
  }

  loadScript() {
    this.loadResourceService.loadScript('assets/js/utils/app.js');
    this.loadResourceService.loadScript('assets/js/utils/page-loader.js');
    this.loadResourceService.loadScript('assets/js/vendor/simplebar.min.js');
    this.loadResourceService.loadScript('assets/js/utils/liquidify.js');
    this.loadResourceService.loadScript('assets/js/vendor/xm_plugins.min.js');
    this.loadResourceService.loadScript('assets/js/sidebar/sidebar.js');
    this.loadResourceService.loadScript('assets/js/global/global.popups.js');
    this.loadResourceService.loadScript('assets/js/form/form.utils.js');
    this.loadResourceService.loadScript('assets/js/utils/svg-loader.js');
    this.loadResourceService.loadScript('assets/js/global/global.accordions.js');
    setTimeout( () => {
      this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
      this.loadResourceService.loadScript('assets/js/global/global.tooltips.js');
      this.loadResourceService.loadScript('assets/js/header/header.js');
      this.loadResourceService.loadScript('assets/js/content/content.js');
      this.loadResourceService.loadScript('assets/js/vendor/tiny-slider.min.js');
    },200)
  }

  searchMember() {
    this.displayList = [];
    this.searchResult = [];
    this.searchData.startYear = this.selectedYear.substring(0,4);
    this.searchData.endYear = this.selectedYear.substring(7);
    console.log(this.searchData);
    this.searchTotalService.findCustomMembers(this.searchData).subscribe(data => {
      for(let i = 0; i<data.length; i++) {
        this.searchResult.push(new MemberResultDTO(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7]))

      }
      console.log(this.searchResult);
      this.totalResult = this.searchResult.length;
      for( let i = 0; i<5; i++) {
        if(this.searchResult.length == 0) {
          break;
        } else {
          this.displayList.push(this.searchResult.shift());
          this.totalDisplayed = this.displayList.length;
        }
      }
        this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
    })
  }

  clearSearch() {
    this.selectedYear = '';
    this.searchData.name = '';
    this.searchData.job = '';
    this.searchData.hobbies = '';
    this.searchData.startYear = '';
    this.searchData.endYear = '';
    this.searchData.gender = 3;
    this.searchData.city = 0;
    this.searchData.currentPage = 1;
    this.searchData.maxPage = 0;
    this.searchData.totalResult = 0;
    this.searchResult = [];
    this.displayList = [];
    this.totalResult = 0;
  }

  onScroll() {
    console.log('scrolled!!');
    for( let i = 0; i<5; i++) {
      if(this.searchResult.length == 0) {
        break;
      } else {
        this.displayList.push(this.searchResult.shift());
        this.totalDisplayed = this.displayList.length;
      }
    }
    this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
  }
}
