import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {InfoAccountDTO} from "../../entity/InfoAccountDTO";
import {SuggestionsService} from "../suggestions.service";
import {StorageService} from "../../security/storage.service";
import {SuggestionToMakeFriendsDTO} from "../../entity/SuggestionToMakeFriendsDTO";

@Component({
  selector: 'app-suggestion-to-make-friends',
  templateUrl: './suggestion-to-make-friends.component.html',
  styleUrls: ['./suggestion-to-make-friends.component.scss']
})
export class SuggestionToMakeFriendsComponent implements OnInit {
  accountId = 1;
  infoAccountDTO: InfoAccountDTO;
  suggestionToMakeFriendsDTO: SuggestionToMakeFriendsDTO[]=[];

  constructor(private loadResourceService:LoadResourceService,
              public suggestionsService: SuggestionsService,
              public storageService: StorageService ) {
    this.loadScript();
    this.getAccountInformation();
  }


  ngOnInit(): void {
    // this.getIdAccount();
  }

  getAccountInformation(){
    this.suggestionsService.getAccountInformation(this.accountId).subscribe((data:InfoAccountDTO) =>{
      this.infoAccountDTO = data;
      var suggestionToMakeFriends = {
        "hobbiesName":data.hobbiesName,
        "cityName":data.cityName,
        "accountId":data.accountId
      };
      this.suggestionsService.getSuggestionToMakeFriends(suggestionToMakeFriends).subscribe((data1:SuggestionToMakeFriendsDTO[]) => {
        this.suggestionToMakeFriendsDTO = data1;
        // console.log(this.suggestionToMakeFriendsDTO);
        for(let temp of this.suggestionToMakeFriendsDTO) {
          console.log(temp)
        }
      });

    });
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

}
