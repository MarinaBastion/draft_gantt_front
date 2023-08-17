import { Component, Input, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormField} from '../models/form-field';
import { Observable, throwError } from 'rxjs';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS,MAT_MOMENT_DATE_FORMATS,} from '@angular/material-moment-adapter';
import {NativeDateAdapter,DateAdapter, MAT_DATE_FORMATS,  MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import '@angular/common/locales/global/ru';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import { formatDate } from '@angular/common';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ValueService} from '../services/value.service';
import {InstanceService} from '../services/instance.service';
import { InstanceDto } from '../models/instance';
import { ValueDto } from '../models/value';



@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.css'],
  providers: [
  ],
})
export class DynamicFormInputComponent {

  constructor(
    private _adapter: DateAdapter<any>,
    private valueService: ValueService,
    private instanceService: InstanceService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {  
    this._locale = 'ru';
    this._adapter.setLocale(this._locale); }

 

  @Input() input: FormField<any> =   new FormField<any>();
  @Input() form: FormGroup = new FormGroup({});

  selected!: Date | null;
  selectedDictionaryValue :string | undefined ;
  valuesList : ValueDto[] = [];
  instancesList: InstanceDto[] = [];


  ngOnInit(): void 
  {
    debugger;
    if (this.input.type === "entity_id")
    {
      var entityId = this.input.entity_id!;
      this.instanceService.getInstancesByEntityId(entityId).subscribe(values => {
        console.log(values);
        this.instancesList = values;
      });
      //this.selectedDictionaryValue = this.input.;
    }
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  get isValid() { return this.form.controls[this.input.key].valid; }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    
    let val = event.target.value;
    let str = formatDate(val!,'dd/MM/YYYY','ru');
  }




}
