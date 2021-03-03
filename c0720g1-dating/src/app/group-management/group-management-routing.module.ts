import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListGroupComponent} from "./list-group/list-group.component";
import {DetailGroupComponent} from "./detail-group/detail-group.component";
import {TimelineGroupComponent} from "./timeline-group/timeline-group.component";


const routes: Routes = [
  {path: 'list-group', component: ListGroupComponent},
  {path: 'detail-group/:id', component: DetailGroupComponent},
  {path: 'timeline-group/:id', component: TimelineGroupComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManagementRoutingModule {
}
