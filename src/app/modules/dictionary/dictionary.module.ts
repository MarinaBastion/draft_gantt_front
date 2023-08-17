import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './dictionary.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    DictionaryComponent
  ],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    MatIconModule
  ]
})
export class DictionaryModule { }
