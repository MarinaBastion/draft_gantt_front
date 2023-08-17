import { Component, OnInit } from '@angular/core';
import { EntityService } from '../../services/entities.service';
import { FieldService } from '../../services/field.service';
import { EntityFieldService } from '../../services/entity-field.service';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { EntityDto, Entity } from '../../models/entity';
import {FieldDto, Field } from '../../models/field';
import {EntityField,EntityFieldDto} from '../../models/entity_field';
import { GuidGenerator } from '../../../../utils/UidGenerator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entity-field-constructor',
  templateUrl: './entity-field-constructor.component.html',
  styleUrls: ['./entity-field-constructor.component.css']
})
export class EntityFieldConstructorComponent implements OnInit {
  isCommonFields:boolean = true;
  listOfFields: FieldDto[] = [];
  listOfFieldsFiltered: FieldDto[] = [];
  listOfFieldsForEntity: FieldDto[] = [];
  FieldsForEntityFromDb: FieldDto[] = [];
  listOfEntities: EntityDto[] = [];
  listOfEntitiesFields : EntityField[] = [];
  selectedField: string = "";
  selectedEntity: string = "";
  selectedFieldForEntity: string = "";
  isSelected: boolean = false;

  constructor(private fieldService: FieldService , private entityService: EntityService, private entityFieldService: EntityFieldService, public datepipe: DatePipe) {

   }

  ngOnInit(): void {
    this.entityService.getEntities().subscribe(values => {
     this.listOfEntities = values;
    });
    this.fieldService.getFields().subscribe(values => {
      this.listOfFields = values;
      this.listOfFieldsFiltered = this.listOfFields;
     });
     this.entityFieldService.getEntityFields().subscribe(values => {
      this.listOfEntitiesFields = values;
     });
    
  }
  getIconByItemState(isCommonFields:boolean): string
  {
    if ( isCommonFields === false)
      return "keyboard_arrow_right"
      else return "keyboard_arrow_left"
  }
  onEntityChanged(){
    var filteredFieldsByEntity = this.listOfEntitiesFields.filter(b => b.entity_id == this.selectedEntity).map(v => v.field_id);
    this.listOfFieldsForEntity = filteredFieldsByEntity.map(c => { return this.listOfFields.filter(x => x.id == c)[0] });
    this.FieldsForEntityFromDb = filteredFieldsByEntity.map(c => { return this.listOfFields.filter(x => x.id == c)[0] });
    this.listOfFieldsFiltered =  this.listOfFields.filter(x => !filteredFieldsByEntity.includes(x.id))
   
  }
  moveField(){
    if (!this.isSelected) return; 
    if (this.isCommonFields === true)
    {
    this.listOfFieldsFiltered = this.listOfFieldsFiltered.filter(c => c.id != this.selectedField);
    this.listOfFieldsForEntity.push(this.listOfFields.filter(x => x.id == this.selectedField)[0]);
    
    }
    else{
      this.listOfFieldsForEntity = this.listOfFieldsForEntity.filter(c => c.id != this.selectedFieldForEntity);
      this.listOfFieldsFiltered.push(this.listOfFields.filter(x => x.id == this.selectedFieldForEntity)[0]);
    }
    this.isSelected = false; 
  
  }
  addEntityField()
  {
    var addedFields = this.listOfFieldsForEntity.filter(x => !this.FieldsForEntityFromDb.map(c => c.id).includes(x.id));
    var addedEntityFields = addedFields.map(c => new EntityFieldDto( GuidGenerator.newGuid(),this.selectedEntity,c.id ) )
    var removedFields = this.listOfEntitiesFields.filter(b => b.entity_id == this.selectedEntity && this.listOfFieldsFiltered.map(c => c.id).includes(b.field_id ));
    //var removedFields = this.FieldsForEntityFromDb.filter(x => !this.listOfFieldsForEntity.map(c => c.id).includes(x.id))
    if (addedEntityFields.length != 0)
      this.entityFieldService.addBatch(addedEntityFields).subscribe(values => {
      var e = values;
     });
    if (removedFields.length != 0)
      this.entityFieldService.removeBatch(removedFields).subscribe(values => {
      var e = values;
     });
  }
}
