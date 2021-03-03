import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupManagementRoutingModule } from './group-management-routing.module';
import { ListGroupComponent } from './list-group/list-group.component';
import { DetailGroupComponent } from './detail-group/detail-group.component';
import { TimelineGroupComponent } from './timeline-group/timeline-group.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ListGroupComponent, DetailGroupComponent, TimelineGroupComponent],
  exports:[
    ListGroupComponent,DetailGroupComponent,TimelineGroupComponent
  ],
    imports: [
        CommonModule,
        GroupManagementRoutingModule,
        FormsModule
    ]
})
export class GroupManagementModule { }
