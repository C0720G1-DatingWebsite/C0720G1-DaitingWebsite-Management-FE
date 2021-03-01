import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../../load-resource.service";
import {SuggestionsService} from "../suggestions.service";
import {StorageService} from "../../security/storage.service";
import {InfoAccountDTO} from "../../entity/InfoAccountDTO";
import {SuggestionToMakeFriendsDTO} from "../../entity/SuggestionToMakeFriendsDTO";

@Component({
  selector: 'app-suggested-pairing',
  templateUrl: './suggested-pairing.component.html',
  styleUrls: ['./suggested-pairing.component.scss']
})
export class SuggestedPairingComponent implements OnInit {
  accountId = 1;
  infoAccountDTO: InfoAccountDTO;
  suggestionToMakeFriendsDTO: SuggestionToMakeFriendsDTO[] = [];
  image : string;
  size = 8;

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
      var suggestedPairing = {
        "hobbiesName":data.hobbiesName,
        "cityName":data.cityName,
        "gender" : data.gender,
        "maritalStatusId" :data.maritalStatusId,
        "accountId":data.accountId,
        "size" : this.size
      };
      this.suggestionsService.getSuggestedPairing(suggestedPairing).subscribe((data1:SuggestionToMakeFriendsDTO[]) => {
        this.suggestionToMakeFriendsDTO = data1;
        console.log(data1)
      });

    });
  }


  getIdAccount() {
    if (this.storageService.getUser()) {
      const user = this.storageService.getUser();
      this.accountId = this.storageService.getUser().id;
      console.log(this.storageService.getUser().id);
    }
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

  onScroll() {
    this.size += 5;
    this.getAccountInformation();
    this.loadResourceService.loadScript('assets/js/global/global.hexagons.js');
  }

}
