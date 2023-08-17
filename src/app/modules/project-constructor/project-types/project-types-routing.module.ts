import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTypesComponent } from './project-types.component';
import { ProjectTypeFieldsComponent } from '../project-type-fields/project-type-fields.component';

const routes: Routes = [{ path: '', component: ProjectTypesComponent },
                        { path: 'projectFieldsConstructor', component: ProjectTypeFieldsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTypesRoutingModule { }
