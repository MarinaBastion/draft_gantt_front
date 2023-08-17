import { Component, OnInit } from '@angular/core';
import { FieldService } from '../../services/field.service';
import { EntityService } from '../../services/entities.service';
import { InstanceService } from '../../services/instance.service'
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { FieldDto, Field } from '../../models/field';
import { GuidGenerator } from '../../../../utils/UidGenerator';
import { DatePipe } from '@angular/common';
import {TypeField,TypeFieldto} from "../../models/type";
import { DataTypes } from "../../constants/constant";
import {EntityDto} from "../../models/entity";
import {InstanceDto} from "../../models/instance";


@Component({
  selector: 'app-field-constructor',
  templateUrl: './field-constructor.component.html',
  styleUrls: ['./field-constructor.component.css'],
  providers: [ FieldService,DatePipe ]
})
export class FieldConstructorComponent implements OnInit {
  panelOpenState = false;
  selectedNameForEdit = "";
  selectedDescriptionForEdit: string = "";
  isEdite = false;
  selectedValueId: any;
  selectedName: any;
  selectedDescription: string = "";
  selectedType: string = "";
  listOfFields: FieldDto[] = [];
  dataTypes = DataTypes;
  enumKeys: any[] = [];
  enumValues: any[] = [];
  selectedEntity: string = "";
  listOfEntities: EntityDto[] = [];
  listOfInstances: InstanceDto[] = [];
  isInstanceEmpty: boolean = false;
  selectedInstance: string = "";

  constructor(private fieldService: FieldService , private entityService : EntityService,
    private instanceService: InstanceService,  public datepipe: DatePipe) { 
    this.enumKeys = Object.keys(this.dataTypes);
    this.enumValues = Object.values(this.dataTypes);
  }

  getAllFields(){
    this.fieldService.getFields();
  }
  
  onEntityChanged(){
    this.instanceService.getInstancesByEntityId(this.selectedEntity).subscribe(values => {
      this.listOfInstances = [];
      if ((values === null)|| values.length === 0) 
        {
          this.isInstanceEmpty = false;
        }
        else
        {
          this.listOfInstances = values;
          this.isInstanceEmpty = true;
        }
    });
  }

  getKeyByValue(value: string) {
    const indexOfS = Object.values(this.dataTypes).indexOf(value as unknown as DataTypes);
  
    const key = Object.keys(DataTypes)[indexOfS];
  
    return key;
  }

  addField()
  {
    let date = Date.now();
    let date_str = this.datepipe.transform(date,'dd-MM-YYYY');
    const indexOfSelected = Object.keys(this.dataTypes).indexOf(this.selectedType);
    const valueofSelected = Object.values(this.dataTypes)[indexOfSelected];
    var type: TypeFieldto = new TypeFieldto(valueofSelected,this.selectedEntity,this.selectedInstance, "" );
    var field:FieldDto = new FieldDto(GuidGenerator.newGuid(),date_str!,this.selectedDescription,this.selectedName,type);
    this.fieldService.insert(field).subscribe(values => {
     var e = values;
    });

  }
  expansionPanelIndex(id:string){
    console.log(id);
    let item = this.listOfFields.filter(c => c.id == id)[0];
    this.selectedNameForEdit = item.name;
    this.selectedType = this.getKeyByValue(item.type.simple_type);
    this.selectedDescriptionForEdit = item.decsription;
    this.selectedEntity = item.type.directory_id;
    this.selectedInstance = item.type.instance_directory_id;
  }
    
  saveField(id:string,name:string,description:string)
  {
    let date = Date.now();
    let date_str = this.datepipe.transform(date,'dd-MM-YYYY');
    const indexOfSelected = Object.keys(this.dataTypes).indexOf(this.selectedType);
    const valueofSelected = Object.values(this.dataTypes)[indexOfSelected];
    var type: TypeFieldto = new TypeFieldto( valueofSelected,this.selectedEntity,this.selectedInstance , "");
    var field:FieldDto = new FieldDto(id,date_str!,description,name,type);
    this.fieldService.update(field).subscribe(values => {
    var e = values;
    });

  }
  ngOnInit(): void {
    this.fieldService.getFields().subscribe(values => {
     this.listOfFields = values;
    });
    this.entityService.getEntities().subscribe(values => {
      this.listOfEntities = values;
     });
  }

}