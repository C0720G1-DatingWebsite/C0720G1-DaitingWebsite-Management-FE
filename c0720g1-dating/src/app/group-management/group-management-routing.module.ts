import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListGroupComponent} from "./list-group/list-group.component";
import {DetailGroupComponent} from "./detail-group/detail-group.component";


const routes: Routes = [
  {path: 'list-group', component: ListGroupComponent},
  {path: 'detail-group/:id', component: DetailGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManagementRoutingModule {
}
