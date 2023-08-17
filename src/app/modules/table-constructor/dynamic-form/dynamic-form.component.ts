import { Component, Input, OnChanges, OnInit, SimpleChanges ,AfterViewChecked,Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../models/form-field';
import { FormFieldService } from '../services/form-field.service';
import { DynamicFormValue} from '../../../interfaces/dynamicFormValues'
import { formatDate } from '@angular/common';
import { ValueService } from '../services/value.service';
import { InstanceModel ,InstanceDto} from '../models/instance';
import { ValueDto} from '../models/value';
import { InstanceService } from '../services/instance.service';
import { Field,FieldDto} from '../models/field';
import { TypeFieldto} from '../models/type';
import { mergeMap } from 'rxjs/operators';
import { throws } from 'assert';
import { GuidGenerator } from 'src/app/utils/UidGenerator';
import { DataTypes } from '../constants/constant'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})

export class DynamicFormComponent implements OnInit, OnChanges {
  
  @Input() formFields: FormField<any>[] = [];
  @Input() instance: InstanceDto = new InstanceDto();
  @Input() field: FieldDto[]=[];
  
  form: FormGroup = new FormGroup({});
  payLoad = ' ';
  payloadValue: ValueDto[] =[];// DynamicFormValue[] = [];
  name: string = "";
  description : string = "";
  instanceValues: ValueDto[] = [];

  constructor(private formfieldService: FormFieldService, private instanceService : InstanceService, private valueService: ValueService) { }

  ngOnInit(): void {
    this.name = this.instance.name!;
    this.description = this.instance.decsription!;
    if (!(this.instance.id ==="" || this.instance.id === null || this.instance.id === undefined))
    {
      this.valueService.getByInstanceId(this.instance.id).subscribe(
        value => {
          debugger;
          this.formFields.map(c => { 
            var res = value.filter(x => c.key === x.field_id)[0];
            c.value = res.bool_data ?? res.numeric_data ?? res.text_data ?? res.value_instance_id ;
            if (c.type == DataTypes.DateTime)
            {
              const [ day, month, year] = c.value.split('/');
              console.log(month); // 👉️ "07"
              console.log(day); // 👉️ "21"
              console.log(year); // 👉️ "2024"
              const date = new Date(+year, +month - 1, +day);
              console.log(date);
              c.value = date;
            }
          });
          this.form = this.formfieldService.toFormGroup(this.formFields);
          this.form.valueChanges.subscribe(c => {console.log(c)});
        }
      )
    }
    else{
      this.form = this.formfieldService.toFormGroup(this.formFields);
      this.form.valueChanges.subscribe(c => {console.log(c)});
    }
   
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.formfieldService.toFormGroup(this.formFields);
    this.form.valueChanges.subscribe(c => {console.log(c)});
  }
  ngAfterViewChecked(){
    // debugger;
    // this.form = this.formfieldService.toFormGroup(this.formFields);
    // this.form.valueChanges.subscribe(c => {console.log(c)});
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.payloadValue = [];
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      var v = this.form.controls[key];
      console.log(v);
      var str: string = "";
      var type:string = typeof(v.value);
          if (type == "object")
          {
            let val =v.value;
            str = formatDate(val!,'dd/MM/yyyy','ru');
            console.log(str);
          } 
          else
          {
            str = v.value;
          }
          var t = this.field.find(c => c.id == key)?.type;
          let entry: ValueDto;
          
          switch (t!.simple_type)
          {
            case DataTypes.Boolean :
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: null, numeric_data: null, 
                bool_data: str.toString().toLowerCase() ==='true',parent_value_id: null,value_instance_id : null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.String :
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: str, numeric_data: null, 
                bool_data: null,parent_value_id: null,value_instance_id : null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.Currency:
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: null, numeric_data: Number(str), 
                bool_data: null,parent_value_id: null,value_instance_id : null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.DateTime:
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: str, numeric_data: null, 
                bool_data: null,parent_value_id: null,value_instance_id : null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.String:
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: str, numeric_data: null, 
                bool_data: null,parent_value_id: null, value_instance_id :null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.Double:
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: null, numeric_data: Number(str), 
                bool_data: null,parent_value_id: null,value_instance_id : null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.Integer:
              {
                entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: null, numeric_data: Number(str), 
                bool_data: null,parent_value_id: null,value_instance_id : null} 
                this.payloadValue.push(entry);
                break;
              }
              case DataTypes.Entity:
                {
                  entry = {id: GuidGenerator.newGuid(),field_id: key,instance_id:this.instance.id!, text_data: null, numeric_data: null, 
                  bool_data: null,parent_value_id: null,value_instance_id : str } 
                  this.payloadValue.push(entry);
                  break;
                }
          }
    });
    debugger;
    if (this.instance.id ==="" || this.instance.id === null || this.instance.id === undefined)
    {
      this.instance.id  = GuidGenerator.newGuid();
      this.instance.create_date = formatDate(new Date(),'dd/MM/YYYY','ru');
      this.instance.name = this.name;
      this.instance.decsription = this.description;
      debugger;
      this.instanceService.insert(this.instance).subscribe(values => 
        {
          this.payloadValue = this.payloadValue.map(data=> { return new ValueDto(data.id,data.field_id,this.instance.id!,data.text_data,data.numeric_data,data.bool_data,data.parent_value_id,data.value_instance_id)})
          this.valueService.addBatch(this.payloadValue).subscribe(values => 
          {
            var e = values;
            console.log(e);
          })
        });
    }
    else
    {
      this.valueService.deleteBatch(this.instance.id).subscribe(
        c => 
        {
          if (c)
          {
            this.valueService.addBatch(this.payloadValue).subscribe(values => 
              {
                var e = values;
                console.log(e);
              })
          }
        }
      )
    }
    console.log(this.form.getRawValue());
  }

}