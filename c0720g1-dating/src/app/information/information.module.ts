import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information/information.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    ReactiveFormsModule
  ]
})
export class InformationModule { }
