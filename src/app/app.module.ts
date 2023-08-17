import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttComponent } from './gantt/gantt.component';
import { UserComponent } from './models/user/user.component';
import { RegistrationComponent } from './models/user/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ToolBarComtainerComponent } from './components/tool-bar-comtainer/tool-bar-comtainer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { FormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';

// import {FlatTreeControl} from '@angular/cdk/tree';
// import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@NgModule({
  declarations: [
    AppComponent,
    GanttComponent,
    UserComponent,
    RegistrationComponent,
    ProjectListComponent,
    ToolBarComtainerComponent,
    UserProfileComponent,
    ProjectCardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorService,
  multi: true
}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
