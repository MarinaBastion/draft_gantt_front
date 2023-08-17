import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableConstructorComponent } from './table-constructor.component';
import { FieldConstructorComponent } from './field-constructor/field-constructor/field-constructor.component';
import { ValueComponent } from './value-constructor/value/value.component'
import { EntityFieldConstructorComponent } from './entity-field/entity-field-constructor/entity-field-constructor.component'
const routes: Routes = [{ path: '', component: TableConstructorComponent },
{ path: 'fieldConstructor', component: FieldConstructorComponent },
{ path: 'entityFieldConstructor', component: EntityFieldConstructorComponent },
{ path: 'valueConstructor', component: ValueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableConstructorRoutingModule { }
