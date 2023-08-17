import { Component, OnInit } from '@angular/core';
import { ValueService } from '../../services/value.service';
import { FieldService } from '../../services/field.service';
import { FieldDto, Field } from '../../models/field';
import { InstanceDto, Instance, InstanceModel } from '../../models/instance';
import { ValueDto,Value } from '../../models/value';
import { EntityDto,Entity } from '../../models/entity';
import { GuidGenerator } from '../../../../utils/UidGenerator';
import { DatePipe } from '@angular/common';
import {TypeField,TypeFieldto} from "../../models/type";
import { DataTypes } from "../../constants/constant"
import { EntityFieldService } from '../../services/entity-field.service';
import { EntityService } from '../../services/entities.service';
import { InstanceService } from '../../services/instance.service';
import { FormField } from '../../models/form-field';
import { FormFieldService } from '../../services/form-field.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { throws } from 'assert';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
  providers: [ FieldService,DatePipe,EntityFieldService,ValueService,FieldService,EntityService , FormFieldService]
})
export class ValueComponent implements OnInit {
  panelOpenState = false;
  selectedEntity = "";
  selectedDescriptionForEdit: string = "";
  isEdite = false;
  selectedValueId: any;
  selectedName: any;
  selectedDescription: string = "";
  selectedType: string = "";
  listOfFields: FieldDto[] = [];
  listOfEntities: EntityDto[] = [];
  listOfInstances: InstanceDto[] = [];
  formFields: FormField<string>[] = [];
  

  constructor(private fieldService: FieldService ,public datepipe: DatePipe, private entityService: EntityService, 
  private entityFieldService: EntityFieldService,
  private valueService: ValueService ,
  private instanceService: InstanceService,
  private formFieldService: FormFieldService) { }

  onEntityChanged(){
    debugger;
    if (this.selectedEntity === undefined) return;
    this.instanceService.getInstancesByEntityId(this.selectedEntity).subscribe(values => {
      this.listOfInstances = [];
      if (values === null)
        {
          
        }
        else
        {
          this.listOfInstances = values;
        }
        let instance = new InstanceDto( "","",formatDate(new Date(),'dd/MM/YYYY','ru'),"",this.selectedEntity);
        this.listOfInstances.push(instance);
    });
    this.fieldService.getFieldsByEntityId(this.selectedEntity).subscribe(values => {
      this.listOfFields = values;
      this.formFields = this.listOfFields.map(c => {
        debugger;
        return new FormField<any>({
          controlType: c.type.simple_type,
          key: c.id,
          label: c.name,
          type: c.type.simple_type,
          required: true,
          entity_id: c.type.directory_id ,
        })})
    });
  }

  ngOnInit(): void {
    this.entityService.getEntities().subscribe(values => {
    this.listOfEntities = values;
    });
  }
}
