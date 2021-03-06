import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InformationComponent} from "./information/information.component";


const routes: Routes = [
  {path: 'information/:userName', component: InformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
