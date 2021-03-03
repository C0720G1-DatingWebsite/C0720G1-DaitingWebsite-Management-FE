import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import {AccountSearchModule} from "./account-search/account-search.module";
import {GroupManagementModule} from "./group-management/group-management.module";
import {LoginModule} from "./login/login.module";
import {ChangePasswordModule} from "./change-password/change-password.module";

import {CreatePostModule} from "./create-post/create-post.module";
import {ChangeAvatarModule} from "./change-avatar/change-avatar.module";
import {SuggestionsRoutingModule} from "./suggestions/suggestions-routing.module";
import {SuggestionsModule} from "./suggestions/suggestions.module";




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
    ChangePasswordModule,
    GroupManagementModule,
    CreatePostModule,
    ChangeAvatarModule,
    SuggestionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
