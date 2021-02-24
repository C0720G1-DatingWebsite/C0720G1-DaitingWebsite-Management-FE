import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import {AccountSearchRoutingModule} from './account-search-routing.module';



@NgModule({
  declarations: [AdvanceSearchComponent],
  imports: [
    CommonModule,
    AccountSearchRoutingModule,
  ]
})
export class AccountSearchModule { }
