import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'comment', redirectTo: 'comment', pathMatch: 'full'},
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommentRoutingModule { }
