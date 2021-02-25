import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import {AccountSearchModule} from "./account-search/account-search.module";
import {LoginModule} from "./login/login.module";
import {ChangePasswordModule} from "./change-password/change-password.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountSearchModule,
    LoginModule,
    ChangePasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
