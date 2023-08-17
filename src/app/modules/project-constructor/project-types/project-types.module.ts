import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTypesRoutingModule } from './project-types-routing.module';
import { ProjectTypesComponent } from './project-types.component';
import { ProjectTypeFieldsComponent } from '../project-type-fields/project-type-fields.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialModule } from '../../material/material.module';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    ProjectTypesComponent,
    ProjectTypeFieldsComponent
  ],
  imports: [
    CommonModule,
    ProjectTypesRoutingModule,
    MatListModule,
    MatExpansionModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    CdkAccordionModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class ProjectTypesModule { }
