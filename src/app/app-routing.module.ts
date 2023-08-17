import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './models/user/user.component';
import { RegistrationComponent } from './models/user/registration/registration.component';
import { GanttComponent } from './gantt/gantt.component'
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {ToolBarComtainerComponent } from './components/tool-bar-comtainer/tool-bar-comtainer.component';
import {UserProfileComponent } from './components/user-profile/user-profile.component';
import {ProjectCardComponent } from './components/project-card/project-card.component';
import { FieldConstructorComponent} from './modules/table-constructor/field-constructor/field-constructor/field-constructor.component';
import {LoginComponent} from './components/login/login.component'

const routes: Routes = [
  { path: 'container', component: ToolBarComtainerComponent ,
  children: [
    { path: 'user_profile', component: UserProfileComponent  },
    {path: 'gantt', component: GanttComponent},
    {path: 'projects', component: ProjectListComponent},
    { path: 'gantt/:id', component: GanttComponent },
    { path: 'card/:id', component: ProjectCardComponent },
    { path: 'tableConstructor', loadChildren: () => import('./modules/table-constructor/table-constructor.module').then(m => m.TableConstructorModule) },
    { path: 'projectTypes', loadChildren: () => import('./modules/project-constructor/project-types/project-types.module').then(m => m.ProjectTypesModule) },
  ],},
  
  { path: 'login', component: LoginComponent },
 
 
  { path: '', redirectTo: '/container', pathMatch : 'full'},
  { path: 'register', component: RegistrationComponent,
    children:[{path: 'user', component: UserComponent}]
  },
  {path: 'gantt', component: GanttComponent},
  {path: 'projects', component: ProjectListComponent},
 
  { path: 'dictionary', loadChildren: () => import('./modules/dictionary/dictionary.module').then(m => m.DictionaryModule) },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
