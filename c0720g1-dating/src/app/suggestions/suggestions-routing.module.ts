import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SuggestionToMakeFriendsComponent} from "./suggestion-to-make-friends/suggestion-to-make-friends.component";
import {SuggestedPairingComponent} from "./suggested-pairing/suggested-pairing.component";


const routes: Routes = [
  {path: 'suggestion-to-make-friends', component: SuggestionToMakeFriendsComponent},
  {path: 'suggested-pairing', component: SuggestedPairingComponent},
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
