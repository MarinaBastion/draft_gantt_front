import { Component, OnInit } from '@angular/core';
import { EntityService } from './services/entities.service';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { EntityDto, Entity } from './models/entity';
import { GuidGenerator } from '../../utils/UidGenerator';
import { DatePipe } from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-table-constructor',
  templateUrl: './table-constructor.component.html',
  styleUrls: ['./table-constructor.component.css'],
  providers: [ EntityService,DatePipe ]
})
export class TableConstructorComponent implements OnInit {
  panelOpenState = false;
  selectedNameForEdit = "";
  selectedDescriptionForEdit: string = "";
  isEdite = false;
  selectedValueId: any;
  selectedName: any;
  selectedDescription: string = "";
  listOfEntities: EntityDto[] = [];
  constructor(private entityService: EntityService ,public datepipe: DatePipe) { }

  getAllEntities(){
    this.entityService.getEntities();
  }
  
  addEntity()
  {
    let date = Date.now();
    let date_str = this.datepipe.transform(date,'dd-MM-YYYY');

    var entity:EntityDto = new EntityDto(GuidGenerator.newGuid(),date_str!,this.selectedDescription,this.selectedName);
    this.entityService.insert(entity).subscribe(values => {
     var e = values;
    });

  }
  expansionPanelIndex(id:string){
  console.log(id);
  let item = this.listOfEntities.filter(c => c.id == id)[0];
  this.selectedNameForEdit = item.name;
  this.selectedDescriptionForEdit = item.decsription;
  }
    
  saveEntity(id:string,name:string,description:string)
  {
    let date = Date.now();
    let date_str = this.datepipe.transform(date,'dd-MM-YYYY');

    var entity:EntityDto = new EntityDto(id,date_str!,description,name);
    this.entityService.update(entity).subscribe(values => {
     var e = values;
    });
  }
  ngOnInit(): void {
    this.entityService.getEntities().subscribe(values => {
     this.listOfEntities = values;
    });
  }

}
