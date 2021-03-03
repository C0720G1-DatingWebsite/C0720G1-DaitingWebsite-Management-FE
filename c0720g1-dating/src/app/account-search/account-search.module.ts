import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import {AccountSearchRoutingModule} from './account-search-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";



@NgModule({
  declarations: [AdvanceSearchComponent],
    imports: [
        CommonModule,
        AccountSearchRoutingModule,
        HttpClientModule,
        FormsModule,
        InfiniteScrollModule
    ]
})
export class AccountSearchModule { }
