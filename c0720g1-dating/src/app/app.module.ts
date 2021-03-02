import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
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
import {AccountWallAboutModule} from "./account-wall-about/account-wall-about.module";
import {AngularFireModule} from "@angular/fire";
import {changeAvatar} from "../environments/change-avatar";
import {imagePost} from "../environments/image-post";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {FriendsModule} from "./friends/friends.module";
import {HomeModule} from "./home/home.module";
import {AccountReportManagementModule} from "./account-report-management/account-report-management.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AccountSearchModule,
    LoginModule,
    ChangePasswordModule,
    GroupManagementModule,
    CreatePostModule,
    ChangeAvatarModule,
    AccountWallAboutModule,
    AngularFireModule.initializeApp(changeAvatar.firebaseConfig),
    AngularFireModule.initializeApp(imagePost.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FriendsModule,
    HomeModule,
    AccountReportManagementModule,
    AccountWallAboutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
