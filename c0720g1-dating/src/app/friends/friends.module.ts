import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFriendMadeComponent } from './list-friend-made/list-friend-made.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import {FriendRoutingModule} from "./friend-routing.module";
import { AddFriendsComponent } from './add-friends/add-friends.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";



@NgModule({
  declarations: [ListFriendMadeComponent, FriendRequestComponent, AddFriendsComponent],
  imports: [
    CommonModule,
    FriendRoutingModule,
    InfiniteScrollModule
  ]
})
export class FriendsModule { }
