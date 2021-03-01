import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatGroupComponent} from "./chat-group/chat-group.component";


const routes: Routes = [
  {path:"chat-group",component:ChatGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatGroupRoutingModule { }
