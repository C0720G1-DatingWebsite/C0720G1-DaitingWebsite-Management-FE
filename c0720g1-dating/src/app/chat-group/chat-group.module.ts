import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatGroupRoutingModule } from './chat-group-routing.module';
import { ChatGroupComponent } from './chat-group/chat-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [ChatGroupComponent],
  imports: [
    CommonModule,
    ChatGroupRoutingModule,
    FormsModule,
    PickerModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class ChatGroupModule { }
