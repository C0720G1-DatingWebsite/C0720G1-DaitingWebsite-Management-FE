import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {PostComponent} from './post/post.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeRoutingModule} from "./home-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RouterModule} from "@angular/router";
import {AccountWallAboutModule} from "../account-wall-about/account-wall-about.module";

/** LuyenNT
 */
@NgModule({
  declarations: [PostComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        FormsModule,
        RouterModule,
        AccountWallAboutModule
    ]
})
export class HomeModule {
}
