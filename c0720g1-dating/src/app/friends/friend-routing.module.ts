import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {ListFriendMadeComponent} from "./list-friend-made/list-friend-made.component";
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {AddFriendsComponent} from "./add-friends/add-friends.component";


const routes: Routes = [
  {
    path: 'profile/:id/list-friend', component: ListFriendMadeComponent
  },
  {
    path: 'profile/:id/friend-request', component: FriendRequestComponent
  },
  {
    path: 'profile/:id/search/:nameSearch', component: AddFriendsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule { }
