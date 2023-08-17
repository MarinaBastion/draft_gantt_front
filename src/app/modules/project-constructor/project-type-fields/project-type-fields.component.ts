import { Component, OnInit } from '@angular/core';
import { ProjectTypeFieldService } from '../../../modules/table-constructor/services/project-type-field.service';
import { FieldService } from '../../../modules/table-constructor/services/field.service';
import { ProjectTypeService } from '../../../modules/table-constructor/services/project-type.service';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProjectTypeDto } from '../../../modules/table-constructor/models/project-type';
import {FieldDto, Field } from '../../../modules/table-constructor/models/field';
import { ProjectTypeFieldsDto} from '../../../modules/table-constructor/models/project-type-fields';
import { GuidGenerator } from '../../../utils/UidGenerator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-type-fields',
  templateUrl: './project-type-fields.component.html',
  styleUrls: ['./project-type-fields.component.css']
})
export class ProjectTypeFieldsComponent implements OnInit {

  isCommonFields:boolean = true;
  listOfFields: FieldDto[] = [];
  listOfFieldsFiltered: FieldDto[] = [];
  listOfFieldsForProjectType: FieldDto[] = [];
  FieldsForProjectTypeFromDb: FieldDto[] = [];
  listOfProjectTypes: ProjectTypeDto[] = [];
  listOfProjectTypeFields : ProjectTypeFieldsDto[] = [];
  selectedField: string = "";
  selectedProjectType: string = "";
  selectedFieldForProjectType: string = "";
  isSelected: boolean = false;

  constructor(private fieldService: FieldService , private projectTypeService: ProjectTypeService, private projectTypeFieldService: ProjectTypeFieldService, public datepipe: DatePipe) {

   }

  ngOnInit(): void {
    this.projectTypeService.getProjectTypes().subscribe(values => {
     this.listOfProjectTypes = values;
    });
    this.fieldService.getFields().subscribe(values => {
      this.listOfFields = values;
      this.listOfFieldsFiltered = this.listOfFields;
     });
     this.projectTypeFieldService.getProjectTypeFields().subscribe(values => {
      this.listOfProjectTypeFields = values;
     });
    
  }
  getIconByItemState(isCommonFields:boolean): string
  {
    if ( isCommonFields === false)
      return "keyboard_arrow_right"
      else return "keyboard_arrow_left"
  }
  onProjectTypeChanged(){
    var filteredFieldsByProjectType = this.listOfProjectTypeFields.filter(b => b.project_type_id == this.selectedProjectType).map(v => v.field_id);
    this.listOfFieldsForProjectType = filteredFieldsByProjectType.map(c => { return this.listOfFields.filter(x => x.id == c)[0] });
    this.FieldsForProjectTypeFromDb = filteredFieldsByProjectType.map(c => { return this.listOfFields.filter(x => x.id == c)[0] });
    this.listOfFieldsFiltered =  this.listOfFields.filter(x => !filteredFieldsByProjectType.includes(x.id))
   
  }
  moveField(){
    if (!this.isSelected) return; 
    if (this.isCommonFields === true)
    {
    this.listOfFieldsFiltered = this.listOfFieldsFiltered.filter(c => c.id != this.selectedField);
    this.listOfFieldsForProjectType.push(this.listOfFields.filter(x => x.id == this.selectedField)[0]);
    
    }
    else{
      this.listOfFieldsForProjectType = this.listOfFieldsForProjectType.filter(c => c.id != this.selectedFieldForProjectType);
      this.listOfFieldsFiltered.push(this.listOfFields.filter(x => x.id == this.selectedFieldForProjectType)[0]);
    }
    this.isSelected = false; 
  
  }
  addProjectTypeField()
  {
    var addedFields = this.listOfFieldsForProjectType.filter(x => !this.FieldsForProjectTypeFromDb.map(c => c.id).includes(x.id));
    var addedProjectTypeFields = addedFields.map(c => new ProjectTypeFieldsDto( GuidGenerator.newGuid(),this.selectedProjectType,c.id ) )
    var removedFields = this.listOfProjectTypeFields.filter(b => b.project_type_id == this.selectedProjectType && this.listOfFieldsFiltered.map(c => c.id).includes(b.field_id ));
    //var removedFields = this.FieldsForEntityFromDb.filter(x => !this.listOfFieldsForEntity.map(c => c.id).includes(x.id))
    if (addedProjectTypeFields.length != 0)
      this.projectTypeFieldService.addBatch(addedProjectTypeFields).subscribe(values => {
      var e = values;
     });
    if (removedFields.length != 0)
      this.projectTypeFieldService.removeBatch(removedFields).subscribe(values => {
      var e = values;
     });
  }
}


