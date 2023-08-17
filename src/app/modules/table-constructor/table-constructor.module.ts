import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableConstructorRoutingModule } from './table-constructor-routing.module';
import { TableConstructorComponent } from './table-constructor.component';
import { EntityService } from './services/entities.service';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialModule } from '../material/material.module';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FieldConstructorComponent } from './field-constructor/field-constructor/field-constructor.component';
import { ValueComponent } from './value-constructor/value/value.component';
import { EntityFieldConstructorComponent } from './entity-field/entity-field-constructor/entity-field-constructor.component';
import { DynamicFormInputComponent } from './dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    TableConstructorComponent,
    FieldConstructorComponent,
    ValueComponent,
    EntityFieldConstructorComponent,
    DynamicFormInputComponent,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    TableConstructorRoutingModule,
    MatListModule,
    MatExpansionModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    CdkAccordionModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [EntityService,DatePipe]
})
export class TableConstructorModule { }
