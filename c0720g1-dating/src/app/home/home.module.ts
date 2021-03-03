import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {PostComponent} from './post/post.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeRoutingModule} from "./home-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

/** LuyenNT
 */
@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
