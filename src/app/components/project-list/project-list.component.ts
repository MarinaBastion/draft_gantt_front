import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {LinkService} from "../../services/link.service";
import {UserService} from "../../services/user.service";
import {ProjectTypeService} from "../../modules/table-constructor/services/project-type.service";
import {Task, TaskDto, TaskViewModel} from "../../models/task";
import { ProjectTypeDto} from "../../modules/table-constructor/models/project-type";
import { ProjectTypeModel} from "../../interfaces/error/error"
import {Assignment, AssignViewModel} from "../../models/assignment";
import {Link, LinkViewModel} from "../../models/link";
import { gantt, Gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt';
import { zip, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ProjectTypesComponent } from 'src/app/modules/project-constructor/project-types/project-types.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [TaskService, LinkService]
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  @ViewChild("gantt_here") ganttContainer: ElementRef | undefined;
  tasks: TaskDto[] = [];
  tasks1: Task[] = [];
  links: Link[] = [];
  projectTypes: ProjectTypeModel[] = [];
  projectTypesDto: ProjectTypeDto[] = [];
  a: any;
  zoom_out : any;
  toggleM: any;
  groupedResponse = zip(this.taskService.getOnlyProjects(), this.linkService.getLinks());

  constructor(private taskService: TaskService, private linkService: LinkService,private projectTypeService: ProjectTypeService , private userService: UserService,private router : Router) { }
  goToProject(id: string){  
    this.router.navigate(['/gantt',id]);  
  }  

  findProjectTypeNameById(id: string | null): string  {
    if (id != null){
      let name = this.projectTypes.filter(c => c.key == id).map(c => c.label)[0];
      return name;
    }
    else{
      return "";
    }
  };
  ngOnInit(): void {
    gantt.plugins({
      auto_scheduling: true
    });
    gantt.i18n.setLocale("ru");
    gantt.config.date_grid = "%d-%m-%Y %H:%i";
    gantt.config.date_format = "%d-%m-%Y %H:%i:%s";
    
     gantt.config.columns = [
      {name: "text", label: "Задача", tree: true, width: 230, template: function (task: any) {
        return `<nav>
                <a href="container/gantt/${task.id}">${task.text}</a>
                </nav>
                <router-outlet></router-outlet>`      
      }},
      {name: "start_date", label: "Начало", align: "center"},
      {name: "duration", label: "Длительность", align: "center"},
      {name: "projectType", label: "Тип проекта", tree: true, width: 230, template: function (task: Task) {
        return `<div>${task.project_type_name}</div>` 
      }},
      {name: "add", width: 44}
    ];

    this.projectTypeService.getProjectTypes().subscribe(values =>
      { 
        
         this.projectTypes = values.map(c => {
          const pr: ProjectTypeModel = {key: c.id, label: c.name}
          return pr})
          gantt.config.lightbox.sections = [
            {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
            {name:"projectType", height:22, map_to:"projectType",type:"select",options:this.projectTypes},                                                                       
            {name:"time", height:72, type:"duration", map_to:"auto"}
        ];
        gantt.locale.labels["section_projectType"] = "Тип проекта";
      }
    )
  }
  ngAfterViewInit() {
    if (!(this.ganttContainer === undefined))
    {
    gantt.init(this.ganttContainer.nativeElement);
    gantt.clearAll(); 
      this.groupedResponse.subscribe(values => {
        var tasks: Task[];
        var taskVm: TaskViewModel[] | undefined;
        var links: Link[];
        taskVm = values[0]; 
        tasks = taskVm.map(element => {
          let projectTypeName = this.findProjectTypeNameById(element.project_type_id);
          return (new Task(element.id,element.start_date,element.text,element.duration,element.progress,element.parent,element.open,element.holder,
            element.priority, element.user?.map(m => new Assignment(m.id,m.resource_id,m.value,m.start_date,m.delay,m.duration,m.mode,m.unit )),element.planned_start,element.planned_end,element.project_type_id
           ,this.findProjectTypeNameById(element.project_type_id) ))
        });
        links = values[1]; 
        gantt.parse({tasks});
      });
    }

    const dp = gantt.createDataProcessor({
      task:
      {
        update: (data: TaskDto) => {
          data.type = "project";
          this.taskService.update(data).subscribe(data => {
            console.log("update",data);
            gantt.refreshData();
          })
        },
        create: (data: TaskDto) => {
          var id = data.id;
          data.type = "project";
          this.taskService.insert(data).subscribe(data => {
            console.log("create", data);
            gantt.changeTaskId(id,data.id);
            gantt.refreshData();
          })
        },
        delete: (id: string) => {
          this.taskService.remove(id).subscribe(data => {
            console.log("delete",data);
            gantt.refreshData();
          })
        }
      },
      link: {
          update: (data: Link) => {this.linkService.update(data).subscribe(data => {
            console.log("update",data);
          gantt.refreshData();})},
          create: (data: Link) => {this.linkService.insert(data).subscribe(data => {
          console.log("create",data);
          gantt.refreshData();})},
          delete: (id : string) => {this.linkService.remove(id).subscribe(data => {
            console.log('delete',data);
          gantt.refreshData();})
          }}
          });

  }

}

function findProjectTypeNameById(project_type_id: string | null) {
  throw new Error('Function not implemented.');
}

