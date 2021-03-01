import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BlockAccountComponent } from './block-account/block-account.component';


/**
 * PhuocTC
 **/

@NgModule({
    declarations: [LoginComponent, BlockAccountComponent],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class LoginModule {
}
