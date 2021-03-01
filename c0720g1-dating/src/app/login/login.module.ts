import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BlockAccountComponent } from './block-account/block-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


/**
 * PhuocTC
 **/

@NgModule({
    declarations: [LoginComponent, BlockAccountComponent, ForgotPasswordComponent],
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
