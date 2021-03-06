import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionToMakeFriendsComponent } from './suggestion-to-make-friends/suggestion-to-make-friends.component';
import { SuggestedPairingComponent } from './suggested-pairing/suggested-pairing.component';
import {SuggestionsRoutingModule} from "./suggestions-routing.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";



@NgModule({
  declarations: [SuggestionToMakeFriendsComponent, SuggestedPairingComponent],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    InfiniteScrollModule
  ]
})
export class SuggestionsModule { }
