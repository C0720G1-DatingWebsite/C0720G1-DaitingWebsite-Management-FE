import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFriendMadeComponent } from './list-friend-made/list-friend-made.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import {FriendRoutingModule} from "./friend-routing.module";



@NgModule({
  declarations: [ListFriendMadeComponent, FriendRequestComponent],
  imports: [
    CommonModule,
    FriendRoutingModule
  ]
})
export class FriendsModule { }
