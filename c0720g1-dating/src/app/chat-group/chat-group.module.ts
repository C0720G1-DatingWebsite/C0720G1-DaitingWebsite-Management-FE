import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatGroupRoutingModule } from './chat-group-routing.module';
import { ChatGroupComponent } from './chat-group/chat-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PickerModule} from "@ctrl/ngx-emoji-mart";


@NgModule({
  declarations: [ChatGroupComponent],
    imports: [
        CommonModule,
        ChatGroupRoutingModule,
        FormsModule,
        PickerModule,
        ReactiveFormsModule
    ]
})
export class ChatGroupModule { }
