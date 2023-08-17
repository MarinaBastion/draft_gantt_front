import { Component, OnInit } from '@angular/core';
import { ProjectTypeService } from '../../table-constructor/services/project-type.service';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProjectTypeDto } from '../../table-constructor/models/project-type';
import { DatePipe } from '@angular/common';
import { GuidGenerator } from '../../../utils/UidGenerator';
import { EntityService } from '../../table-constructor/services/entities.service';
import { ProjectTypesModule } from './project-types.module';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-types',
  templateUrl: './project-types.component.html',
  styleUrls: ['./project-types.component.css'],
  providers: [ ProjectTypeService,DatePipe,MatIconRegistry ]
})
export class ProjectTypesComponent implements OnInit {
  panelOpenState = false;
  selectedNameForEdit = "";
  selectedDescriptionForEdit: string = "";
  isEdite = false;
  selectedValueId: any;
  selectedName: any;
  selectedDescription: string = "";
  listOfProjectTypes: ProjectTypeDto[] = [];
  constructor(private projectTypeService: ProjectTypeService ,public datepipe: DatePipe, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer ) { 
    this.matIconRegistry.addSvgIcon("trash",this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/trash-can_115312.svg'));
  }

  getAllProjectTypes(){
    this.projectTypeService.getProjectTypes();
  }
  
  addProjectType()
  {
    let date = Date.now();
    let date_str = this.datepipe.transform(date,'dd-MM-YYYY');

    var entity:ProjectTypeDto = new ProjectTypeDto(GuidGenerator.newGuid(),this.selectedName,date_str!,this.selectedDescription);
    this.projectTypeService.insert(entity).subscribe(values => {
     var e = values;
     this.projectTypeService.getProjectTypes().subscribe(values => {
      this.listOfProjectTypes = values;
     });
    });
  }

    expansionPanelIndex(id:string){
    console.log(id);
    let item = this.listOfProjectTypes.filter(c => c.id == id)[0];
    this.selectedNameForEdit = item.name;
    this.selectedDescriptionForEdit = item.decsription;
    }
      
    deleteProjectType(id:string)
    {
      this.projectTypeService.remove(id).subscribe(values => {
       var e = values;
       this.projectTypeService.getProjectTypes().subscribe(values => {
        this.listOfProjectTypes = values;
       });
      });
    }
    saveProjectType(id:string,name:string,description:string)
    {
      let date = Date.now();
      let date_str = this.datepipe.transform(date,'dd-MM-YYYY');
  
      var entity:ProjectTypeDto = new ProjectTypeDto(id,date_str!,description,name);
      this.projectTypeService.update(entity).subscribe(values => {
       var e = values;
      });
    }
    ngOnInit(): void {
      this.projectTypeService.getProjectTypes().subscribe(values => {
        this.listOfProjectTypes = values;
       });
    }

}
