import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {TaskService} from "../services/task.service";
import { TaskValueService } from "../modules/table-constructor/services/task-value.service";
import {LinkService} from "../services/link.service";
import {UserService} from "../services/user.service";
import {FieldService} from "../modules/table-constructor/services/field.service";
import {ProjectTypeFieldService} from "../modules/table-constructor/services/project-type-field.service";
import { InstanceService } from "../modules/table-constructor/services/instance.service";
import {Task, TaskDto, TaskViewModel} from "../models/task";
import {FieldDto} from "../modules/table-constructor/models/field";
import {Instance, InstanceDto} from "../modules/table-constructor/models/instance";
import { DataTypes } from "../modules/table-constructor/constants/constant"
import {Link, LinkViewModel} from "../models/link";
import { CashedSettings } from "../settings/settings"
import { gantt, Gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt';
import { zip, map, min, Observable } from 'rxjs';
import { Assignment } from '../models/assignment';
import { User } from '../models/user';
import { MaterialModule } from '../modules/material/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/ru';
import { on } from 'events';
import { TaskValueDto, TaskValueView } from '../modules/table-constructor/models/task-value';
import { Console } from 'console';
import { GuidGenerator } from '../utils/UidGenerator';
import { formatDate } from '@angular/common';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    templateUrl: './gantt.component.html',
   // template: `<div #gantt_here class='gantt-chart'></div>`,
})

export class GanttComponent  implements OnInit, AfterViewInit {
  @ViewChild("gantt_here") ganttContainer: ElementRef | undefined;
  tasks: TaskDto[] = [];
  tasks1: Task[] = [];
  links: Link[] = [];
  list: listServer[] = [];
  a: any;
  zoom_out : any;
  toggleM: any;
  projectUID: string | null = '';
  customColumns: any[] = [];
  fieldsDto: FieldDto[] =  [];
  fieldsFilteredDto: FieldDto[] =  [];
  taskValuesDto: TaskValueDto[] = [];
  instancesDto: InstanceDto[] =  [];
  taskValues : TaskValueView[] | null = [];


  constructor(private taskService: TaskService, private linkService: LinkService,private instanceService:InstanceService, private userService: UserService, private route : ActivatedRoute,
    private router : Router,private projectTypeFieldService: ProjectTypeFieldService, private fieldService: FieldService,
    private taskValueService: TaskValueService){
    this.projectUID = this.route.snapshot.paramMap.get('id'); 
  }
  
  refreshFieldValues( taskValueDto: TaskValueDto[])
  {
    this.taskValueService.deleteBatch(taskValueDto[0].task_id).subscribe(
      data => 
      {
        this.taskValueService.addBatch(taskValueDto).subscribe(
          data => {console.log(data);
          gantt.refreshData();})
      })
  }
  taskValuesConstruct(task: any){
    this.fieldsFilteredDto = [];
      this.taskValuesDto = [];
      for (var key in task) 
      {
        this.fieldsDto.filter(c => c.name == key).map(c => { 
          var taskVal: TaskValueDto;
          if ((c.type.simple_type == DataTypes.Currency ) || (c.type.simple_type == DataTypes.Integer) || (c.type.simple_type == DataTypes.Double ) )
          {
            taskVal = new TaskValueDto(GuidGenerator.newGuid(), c.id,
              task.id, null ,
              task[key],
              null,
              null,
              null );
              this.taskValuesDto.push(taskVal);
          }
          else if (c.type.simple_type == DataTypes.String)
          {
            if (task[key] != 'undefined')
            {
              taskVal = new TaskValueDto(GuidGenerator.newGuid(), c.id,
              task.id,task[key], 
              null ,
              null,
              null,
              null );
              this.taskValuesDto.push(taskVal);
            }
          }
          else if (c.type.simple_type == DataTypes.DateTime )
          {
              taskVal = new TaskValueDto(GuidGenerator.newGuid(), c.id,
              task.id,
              task[key].toLocaleDateString(), 
              null ,
              null,
              null,
              null );
              this.taskValuesDto.push(taskVal);
          }
          //let str = formatDate(val!,'dd/MM/YYYY','ru');

          else if (c.type.simple_type == DataTypes.Boolean )
          {
              taskVal = new TaskValueDto(GuidGenerator.newGuid(), c.id,
              task.id, 
              null ,
              null,
              task[key],
              null,
              null );
              this.taskValuesDto.push(taskVal);
          }
          else if (c.type.simple_type == DataTypes.Entity )
          {
            if (task[key] != '')
            {
              taskVal = new TaskValueDto(GuidGenerator.newGuid(), c.id,
              task.id, 
              null ,
              null,
              null,
              task[key],
              null );
              this.taskValuesDto.push(taskVal);
            }
          }
          
          this.fieldsFilteredDto.push(c) 
        });
      }
      if (this.taskValuesDto.length  > 0)
      {
        this.refreshFieldValues(this.taskValuesDto);
      }      
  }
ngOnInit(): void
{    gantt.config.xml_date = "%d/%m/%Y";
     gantt.config.order_branch = true;
     gantt.config.order_branch_free = true;
      gantt.plugins({
        auto_scheduling: true
      });
      gantt.i18n.setLocale("ru");
      gantt.locale.labels['section_user'] = "Ресурсы";
      gantt.config.date_grid = "%d-%m-%Y";
      gantt.config.date_format = "%d-%m-%Y";
      gantt.config.bar_height = 16;
	    gantt.config.row_height = 40;
      //сcreating new task type
      gantt.config.fit_tasks = true; 
      gantt.config.wide_form = true;
      gantt.config.types["summary"] = "4";
    	gantt.locale.labels["type_summary"] = "Summary";

	//sections for tasks with 'summary' type

      gantt.locale.labels['section_title'] = "Subject";
      gantt.locale.labels['section_details'] = "Details";
      gantt.config.lightbox["summary_sections"] = [
        {name: "title", height: 20, map_to: "text", type: "textarea", focus: true},
        {name: "details", height: 70, map_to: "details", type: "textarea", focus: true},
        {name: "type",height:100, type: "typeselect", map_to: "type",focus:true},
        {name: "time",height:100, type: "time", map_to: "auto"}
      ];


      this.toggleM = function toggleMode(toggle: any) {
        gantt.$zoomToFit = !gantt.$zoomToFit;
        if (gantt.$zoomToFit) {
          toggle.innerHTML = "Set default Scale";
          //Saving previous scale state for future restore
          saveConfig();
          zoomToFit();
        } else {
          toggle.innerHTML = "Zoom to Fit";
          restoreConfig();
          gantt.render();
        }
      }
      gantt.templates.task_text = function (start, end, task) {
        if (task.type == gantt.config.types.summary) {
          return "Summary task: <b>" + task.text + "</b>";
        }
        return task.text;
      };
    
     
      gantt.templates.rightside_text = function (start, end, task) {
        if (task.type == gantt.config.types.summary) {
          return task.text;
        }
        if (task.planned_end) {
          if (end.getTime() > task.planned_end.getTime()) {
            var overdue = Math.ceil(Math.abs((end.getTime() - task.planned_end.getTime()) / (24 * 60 * 60 * 1000)));
            var text = "<b>Просрочено: " + overdue + " дн.</b>";
            return text;
          }
        }
        return "";
      };

      var cachedSettings: CashedSettings = new CashedSettings(Object,Object,Object,Object);
    
      function saveConfig() {
        var config = gantt.config;
        cachedSettings.scales = config.scales;
        cachedSettings.start_date = config.start_date;
        cachedSettings.end_date = config.end_date;
        cachedSettings.scroll_position = gantt.getScrollState();
      }
    
      function restoreConfig() {
        applyConfig(cachedSettings);
      }
    
      function applyConfig(config: any, dates?: any) {
    
        gantt.config.scales = config.scales;
    
        // restore the previous scroll position
        if (config.scroll_position) {
          setTimeout(function(){
            gantt.scrollTo(config.scroll_position.x, config.scroll_position.y)
          },4)
        }
      }
    
    
      function zoomToFit() {
        var project = gantt.getSubtaskDates(),
          areaWidth = gantt.$task.offsetWidth,
          scaleConfigs = zoomConfig.levels;

        for (var i = 0; i < scaleConfigs.length; i++) {
          var columnCount = getUnitsBetween(project.start_date, project.end_date, scaleConfigs[i].scales[scaleConfigs[i].scales.length-1].unit, scaleConfigs[i].scales[0].step);
          if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
            break;
          }
        }
        if (i == scaleConfigs.length) {
          i--;
        }
    
        gantt.ext.zoom.setLevel(scaleConfigs[i].name);
        applyConfig(scaleConfigs[i], project);
      }
    
      //get number of columns in timeline
      function getUnitsBetween(from: any, to: any, unit: any, step: any) {
        var start = new Date(from),
          end = new Date(to);
        var units = 0;
        while (start.valueOf() < end.valueOf()) {
          units++;
          start = gantt.date.add(start, step, unit);
        }
        return units;
      }
    
      this.a = function zoom_in(){
        gantt.ext.zoom.zoomIn();
        gantt.$zoomToFit = false;
        if (document.querySelector(".zoom_toggle") != null)
          document.querySelector(".zoom_toggle")!.innerHTML = "Zoom to Fit";
        
      }
      this.zoom_out = function zoom_out(){
        gantt.ext.zoom.zoomOut();
        gantt.$zoomToFit = false;
        if (document.querySelector(".zoom_toggle") != null)
          document.querySelector(".zoom_toggle")!.innerHTML = "Zoom to Fit";
      }

      var zoomConfig = {
        levels: [
          // hours
          {
            name:"hour",
            scale_height: 27,
            scales:[
              {unit:"day", step: 1, format:"%d %M"},
              {unit:"hour", step: 1, format:"%H:%i"},
            ]
          },
          // days
          {
            name:"day",
            scale_height: 27,
            scales:[
              {unit: "day", step: 1, format: "%d %M"}
            ]
          },
          // weeks
          {
            name:"week",
            scale_height: 50,
            scales:[
              {unit: "week", step: 1, format: function (date: any) {
                var dateToStr = gantt.date.date_to_str("%d %M");
                var endDate = gantt.date.add(date, -6, "day");
                var weekNum = gantt.date.date_to_str("%W")(date);
                return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
              }},
              {unit: "day", step: 1, format: "%j %D"}
            ]
          },
          // months
          {
            name:"month",
            scale_height: 50,
            scales:[
              {unit: "month", step: 1, format: "%F, %Y"},
              {unit: "week", step: 1, format: function (date: any) {
                var dateToStr = gantt.date.date_to_str("%d %M");
                var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }}
            ]
          },
          // quarters
          {
            name:"quarter",
            height: 50,
            scales:[
              {
                unit: "quarter", step: 3, format: function (date: any) {
                  var dateToStr = gantt.date.date_to_str("%M %y");
                  var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                  return dateToStr(date) + " - " + dateToStr(endDate);
                }
              },
              {unit: "month", step: 1, format: "%M"},
            ]
          },
          // years
          {
            name:"year",
            scale_height: 50,
            scales:[
              {unit: "year", step: 5, format: function (date: any) {
                var dateToStr = gantt.date.date_to_str("%Y");
                var endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }}
            ]
          },
          // decades
          {
            name:"year",
            scale_height: 50,
            scales:[
              {unit: "year", step: 100, format: function (date: any) {
                var dateToStr = gantt.date.date_to_str("%Y");
                var endDate = gantt.date.add(gantt.date.add(date, 100, "year"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }},
              {unit: "year", step: 10, format: function (date: any) {
                var dateToStr = gantt.date.date_to_str("%Y");
                var endDate = gantt.date.add(gantt.date.add(date, 10, "year"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }},
            ]
          },
        ],
        element: function(){
          return gantt.$root.querySelector(".gantt_task");
        }
      };

      gantt.config.fit_tasks = true;
    	gantt.ext.zoom.init(zoomConfig);
	    gantt.ext.zoom.setLevel("day");
	    gantt.$zoomToFit = false;

      this.customColumns =  [
        {name: "text", tree: true, width: 200, resize: true},
        {name: "start_date", align: "center", width: 100, resize: true},
        {name: "user", align: "center", width: 120, label: "Ресурс", template: function (task: any) {
          if (task.type == gantt.config.types.project) {
            return "";
          }
          var store = gantt.getDatastore("resource");
          var assignments = gantt.getTaskAssignments(task.id);

          var uniqueResources : any= {};
          var resourceCount = 0;
          assignments.forEach(function(a){
           
            if(!uniqueResources[a.resource_id]){
              uniqueResources[a.resource_id] = a.resource_id;
              resourceCount++;
            }
          
          });

          if(!resourceCount){
            return "Не назначен";
          }else if(resourceCount === 1){
            return store.getItem(assignments[0].resource_id).text;
          }else{
            var result = "";
            for(var i in uniqueResources){
              var owner = store.getItem(uniqueResources[i]);
              if (!owner)
                continue;
              result += "<div class='owner-label' title='" + owner.text + "'>" + owner.text.substr(0, 1) + "</div>";
            }
            return result;
          }
        
          return result;
          }, resize: true
        },
        {name: "duration", align: "center", resize:true, min_width:100},
        {name: "planned_start", label:"Базовая дата начала",align: "center", resize:true, min_width:100},
        {name: "planned_end", label: "Базовая дата окончания", align: "center", resize:true, min_width:100}
       
      ];
      if (this.projectUID != null)
      {
        this.fieldService.getFieldsByProjectId(this.projectUID!).subscribe(
            value => { 
            this.fieldsDto = value;
            var fields = value.map(x => { 
                                          this.customColumns.push({name: 'typeField', label:'typeField', align: "center", hide:true });
                                          switch( x.type.simple_type)
                                          {
                                            case DataTypes.Entity:
                                              this.instanceService.getInstancesByEntityId(x.type.directory_id).subscribe(
                                              value => 
                                              { 
                                                function dictionaryLabel(task:any){
                                                  var l = x.name ;
                                                  var value = task[l];
                                                  var list = gantt.serverList(x.name);
                                                  for(var i = 0; i < list.length; i++){
                                                    if(list[i].key == value){
                                                      return list[i].label;
                                                    }
                                                  }
                                                  return "";
                                                }
                                                
                                                var list = value.map( src => {return { key:src.id, label: src.name} });
                                                gantt.serverList(x.name, list);
                                                var editor = {type: "select", map_to: x.name , options:gantt.serverList(x.name)}
                                                this.customColumns.push({name: x.name , label: x.name, align: "center", editor: editor,template: dictionaryLabel,resize:true, min_width:100});
                                                this.customColumns.push( {name: "add", width: 44});
                                                  
                                              }
                                              )
                                              break;
                                            case DataTypes.DateTime:
                                              var dateEditor = {type: "date", map_to: x.name, min: new Date(2022, 0, 1), max: new Date(2085, 0, 1)};
                                              this.customColumns.push({name: x.name , label: x.name, align: "center", editor: dateEditor,resize:true, min_width:100});
                                              
                                              break;
                                            case DataTypes.String:
                                              var editor = {type: "text", map_to: x.name};
                                              this.customColumns.push({name: x.name , label: x.name, align: "center", editor: editor,resize:true, min_width:100});
                                              break;
                                            case DataTypes.Integer:
                                              var editor = {type: "number", map_to: x.name};
                                              this.customColumns.push({name: x.name , label: x.name, align: "center", editor: editor,resize:true, min_width:100});
                                              break;  
                                            case DataTypes.Double:
                                              var editor = {type: "number", map_to: x.name};
                                              this.customColumns.push({name: x.name , label: x.name, align: "center", editor: editor,resize:true, min_width:100});
                                              this.customColumns.push( {name: "add", width: 44});
                                              break;  
                                            case DataTypes.Currency:
                                              var editor = {type: "number", map_to: x.name};
                                              this.customColumns.push({name: x.name , label: x.name, align: "center", editor: editor,resize:true, min_width:100});
                                              this.customColumns.push( {name: "add", width: 44});
                                              break;
                                            case DataTypes.Boolean:
                                              var formatter = gantt.ext.formatters.durationFormatter({
                                                false: "false", 
                                                true: "true"
                                              });
                                              var bool_formatter = {type: "duration", map_to: x.name, min:0, max: 1, formatter: formatter};
                                              this.customColumns.push({name: x.name , label: x.name, align: "center", editor: bool_formatter,resize:true, min_width:100});
                                              break;
                                            default :
                                              this.customColumns.push( {name: "add", width: 44});
                                              break;
                                          }

                                        });
            var is_dictionary = value.filter(c => c.type.simple_type == DataTypes.Entity);
            if (is_dictionary.length == 0)
              this.customColumns.push( {name: "add", width: 44});           
          }
        )
      }
      else{
        this.customColumns.push( {name: "add", width: 44});
      }
}


  ngAfterViewInit() 
  {
    gantt.config.xml_date = "%d/%m/%Y";
    if (!(this.ganttContainer === undefined))
    {
      function getResourceAssignments(resourceId: any) {
        var assignments: any;
        var store = gantt.getDatastore(gantt.config.resource_store);
        var resource = store.getItem(resourceId);
    
        if(resource.$role === "task"){
          assignments = gantt.getResourceAssignments(resource.$resource_id, resource.$task_id);
        }else{
          assignments = gantt.getResourceAssignments(resourceId);
          if(store.eachItem){
            store.eachItem(function(childResource:any){
              if(childResource.$role !== "task"){
                assignments = assignments.concat(gantt.getResourceAssignments(childResource.id));
              }
            }, resourceId);
          }
        }
         return assignments;
      }
      
      var resourceConfig = {
        columns: [
          {
            name: "name", label: "Наименование", tree:true, template: function (resource: any) {
              return resource.text;
            }
          },
          {
            name: "workload", label: "Загруженность", template: function (resource: any) {
              var totalDuration = 0;
              if (resource.$role === "task"){
                gantt.getResourceAssignments(resource.$resource_id, resource.$task_id).forEach(function(a){
                  totalDuration += a.value * a.duration;
                });
              }else{
                getResourceAssignments(resource.id).forEach(function (assignment: any) {
                  totalDuration += Number(assignment.value) * assignment.duration;
                });
              }
              return (totalDuration || 0) + "ч";
            }
          }
        ]
      };
  
      gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks, assignments){
        var css = [];
        css.push("resource_marker");
    
        if(resource.$role === "task"){
          css.push("task_cell");
        }else{
          css.push("resource_cell");
        }
    
        var sum = assignments.reduce(function(total, assignment){ 
          return total + Number(assignment.value);
        }, 0);
    
        if (sum <= 8) {
          css.push("workday_ok");
        } else {
          css.push("workday_over");
        }
        return css.join(" ");
      };
    
      gantt.config.resource_render_empty_cells = true;
      gantt.config.columns = this.customColumns;
      gantt.$resourcesStore = gantt.createDatastore({
          name: gantt.config.resource_store,
          type: "treeDatastore",
          initItem: function(item:any) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
          }
        });

        gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks, assignments){
          var css = [];
          css.push("resource_marker");
  
          if(resource.$role === "task"){
            css.push("task_cell");
          }else{
            css.push("resource_cell");
          }
          var sum = assignments.reduce(function(total, assignment){ 
            return total + Number(assignment.value);
          }, 0);
  
          if (sum <= 8) {
            css.push("workday_ok");
          } else {
            css.push("workday_over");
          }
          return css.join(" ");
        };
        gantt.templates.task_class = function(start, end, task){
          if(task.type == gantt.config.types.summary){
              return "summary_task";
          }
          if (task.planned_end) {
            var classes = ['has-baseline'];
            if (end.getTime() > task.planned_end.getTime()) {
              classes.push('overdue');
            }
            return classes.join(' ');
          }
          return "";
      };

        gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks, assignments){
  
          if(resource.$role === "task"){
            if(start_date < resource.end_date && end_date > resource.start_date){
              for(var i = 0; i < assignments.length; i++){
                var a = assignments[i];
                  return "<div data-assignment-cell data-assignment-id='"+a.id+"'"+
                  " data-row-id='"+resource.id+"'"+
                  " data-task='"+resource.$task_id+"'"+
                  " data-start-date='"+gantt.templates.format_date(start_date)+"'"+
                  " data-end-date='"+gantt.templates.format_date(end_date)+"'>" + a.value + "</div>"
              }
              return "<div data-assignment-cell data-empty "+ 
                  " data-row-id='"+resource.id+"'"+
                  " data-resource-id='"+resource.$resource_id+"'"+
                  " data-task='"+resource.$task_id+"'"+
                  " data-start-date='"+gantt.templates.format_date(start_date)+"'"+
                  "'  data-end-date='"+gantt.templates.format_date(end_date)+"'>-</div>";
            }
      
          }else{
            var sum = assignments.reduce(function(total, assignment){ 
              return total + Number(assignment.value);
            }, 0);
      
            if(sum % 1){
              sum = Math.round(sum * 10)/10;
            }
      
            if(sum){
              return "<div>" + sum + "</div>";
            }
            return "";
          }
      return "";
        };
        
    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      { name: "user", type: "resources", map_to: "user", options: gantt.serverList("people"), default_value: 8},
      { name: "type", type: "typeselect", map_to: "type"},
      { name: "time", type: "duration", map_to: "auto" },
      {
        name: "baseline",
        map_to: {start_date: "planned_start", end_date: "planned_end"},
        type: "duration"
      }
    ];
    gantt.locale.labels['section_baseline'] = "Базовые даты";
  
    gantt.config.resource_store = "resource";
    gantt.config.resource_property = "user";
    gantt.config.order_branch = true;
    gantt.config.open_tree_initially = true;
    
    gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
          cols: [
            {view: "grid", group:"grids", scrollY: "scrollVer"},
            {resizer: true, width: 1},
            {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
            {view: "scrollbar", id: "scrollVer", group:"vertical"}
          ],
          gravity:2
        },
        {resizer: true, width: 1},
        {
          config: resourceConfig,
          cols: [
            {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
            {resizer: true, width: 1},
            {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
            {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
          ],
          gravity:1
        },
        {view: "scrollbar", id: "scrollHor"}
      ]
    };
      gantt.config.auto_types = true;  
      gantt.config.auto_scheduling = true;
      gantt.config.keyboard_navigation = true;
      gantt.config.keyboard_navigation_cells = true;
      gantt.$resourcesStore  = gantt.createDatastore({
        
        name: gantt.config.resource_store,
        type: "treeDatastore",
        fetchTasks: true,
        initItem: function (item: any) {
          item.parent = item.parent || gantt.config.root_id;
          item[gantt.config.resource_property] = item.parent;
          item.open = true;
          return item;
        }
      });

      function refreshSummaryTaskDurationAfterAdd(id:string | number){
        var task = gantt.getTask(id);
        if (task.parent){
          var parent = gantt.getTask(task.parent);
          if (parent.parent){
              parent.type = "4";
              if (parent.end_date< task.end)
              {
                 parent.end_date = task.end_date;
              }
              if (parent.start_date > task.start_date)
              {
                parent.start_date = task.start_date;
              }
              gantt.updateTask(parent.id);
              var nextParent = gantt.getTask(parent.parent);
              if (nextParent.parent)
                refreshSummaryTaskDurationAfterAdd(parent.id);
          }          
        }
      }

      function refreshSummaryTaskDurationAfterDelete(id:string | number){
       
          var parent = gantt.getTask(id);
          if ( !gantt.hasChild(parent.id)){
              parent.type = "task";
              gantt.updateTask(parent.id);
          }
          else{
            var childTasks: any[] = gantt.getChildren(parent.id).map(c => gantt.getTask(c));
            if (!((childTasks === undefined)|| (childTasks.length ==0) || (childTasks === null)))
                {
                  var maxDate = childTasks.reduce(function(prev, current) {
                    return (prev.end_date > current.end_date) ? prev : current
                  });
                  var minDate = childTasks.reduce(function(prev, current) {
                    return (prev.start_date < current.start_date) ? prev : current
                  });
                   parent.start_date = minDate.start_date;
                  parent.end_date = maxDate.end_date;
                  gantt.updateTask(parent.id);
                  gantt.refreshTask(parent.id);
                }
              }
      }


      function  refreshSummaryTaskDurationAfterUpdate(id:string | number){
        var task = gantt.getTask(id);
        if (task.parent){
          var parent = gantt.getTask(task.parent);
          
          if ((parent.parent ) || (parent.type == "project" )){   
              if ((parent.parent) && (parent.type != "4")) 
                parent.type = "4";           
              var siblingsTasks: any[] = gantt.getSiblings(id).map(c => gantt.getTask(c));
              if (!((siblingsTasks === undefined)|| (siblingsTasks.length ==0) || (siblingsTasks === null)))
              {
                var maxDate = siblingsTasks.reduce(function(prev, current) {
                  return (prev.end_date > current.end_date) ? prev : current
                });
                var minDate = siblingsTasks.reduce(function(prev, current) {
                  return (prev.start_date < current.start_date) ? prev : current
                });
                parent.start_date = minDate.start_date;
                parent.end_date = maxDate.end_date;
                if (parent.type == "project")
                {
                 parent.duration = maxDate.end_date - minDate.end_date; 
                }
              }                
              
              gantt.updateTask(parent.id);
              gantt.refreshTask(parent.id);
              if (!(parent.parent == 0))
              {
                var nextParent = gantt.getTask(parent.parent);
                if (nextParent.parent)
                  refreshSummaryTaskDurationAfterUpdate(parent.id);
              }
          }
        }
      }
    gantt.attachEvent("onLightbox", function (task_id){
        var first_row_col = <HTMLElement>document.getElementsByClassName("gantt_cal_lsection")[3];
      });
    gantt.attachEvent("onAfterTaskAdd", (id,task) => {
      this.taskValuesConstruct(task);      
      refreshSummaryTaskDurationAfterAdd(task.id);
    });
    gantt.attachEvent("onAfterTaskUpdate",  (id,task) => {
      this.taskValuesConstruct(task);  
		  refreshSummaryTaskDurationAfterUpdate(task.id);
		});
    gantt.attachEvent("onAfterTaskDelete", function(id,task){
      if (task.parent)
      refreshSummaryTaskDurationAfterDelete(task.parent);
    });
      
    gantt.$resourcesStore.attachEvent("onParse", function() {
        console.log("onParse");
          var people: any = [];
    
          gantt.$resourcesStore.eachItem(function(res:any) {
            if (res.$level === 0) {
              var copy = gantt.copy(res);
              copy.key = res.id;
              copy.label = res.text;
              copy.unit = "часы";
              people.push(copy);
            }
          });
          gantt.updateCollection("people", people);
        });
    
        gantt.config.type_renderers[gantt.config.types.project] = function (task:any) {
          var main_el = document.createElement("div");
          main_el.setAttribute(gantt.config.task_attribute, task.id);
          var size = gantt.getTaskPosition(task);
          main_el.innerHTML = [
            "<div class='project-left'></div>",
            "<div class='project-right'></div>"
          ].join('');
          main_el.className = "custom-project";
      
          main_el.style.left = size.left + "px";
          main_el.style.top = size.top + 7 + "px";
          main_el.style.width = size.width + "px";
      
          return main_el;
        };
        gantt.config.type_renderers[gantt.config.types.summary] = function (task:any) {
          var main_el = document.createElement("div");
          main_el.setAttribute(gantt.config.task_attribute, task.id);
          var size = gantt.getTaskPosition(task);
         
          main_el.className = "summary_task";
      
          main_el.style.left = size.left + "px";
          main_el.style.top = size.top + 7 + "px";
          main_el.style.width = size.width + "px";
      
          return main_el;
        };
     
      gantt.config.sort = true; 

      gantt.addTaskLayer({
        renderer: {
          render: function draw_planned(task: any) {
            if (task.planned_start && task.planned_end) {
              var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
              var el = document.createElement('div');
              el.className = 'baseline';
              el.style.left = sizes.left + 'px';
              el.style.width = sizes.width + 'px';
              el.style.top = sizes.top + gantt.config.bar_height + 13 + 'px';
              return el;
            }
            return false;
          },
          // define getRectangle in order to hook layer with the smart rendering
          getRectangle: function(task: any, view : any){
            if (task.planned_start && task.planned_end) {
              return gantt.getTaskPosition(task, task.planned_start, task.planned_end);
            }
            return null;
          }
        }
      });
      gantt.attachEvent("onTaskLoading", function (task) {
        task.planned_start = gantt.date['parseDate'](task.planned_start, "xml_date");
        task.planned_end = gantt.date['parseDate'](task.planned_end, "xml_date");
        return true;
      });

      gantt.init(this.ganttContainer.nativeElement);
      const groupedResponse = zip(this.taskService.getTasksByProjectIdWithFields(this.projectUID? this.projectUID : ''), this.linkService.getLinks());
      groupedResponse.subscribe(values => {
        var tasks1: TaskViewModel[];
        var links: Link[];
        moment.locale('ru');
        tasks1 = values[0];//.sort((a, b) => (moment(a.start_date,"DD-MM-YYYY") < moment(b.start_date,"DD-MM-YYYY") ? -1 : 1));; 
        var tasks: any[] = [];
        this.taskValues = [];
        for (var t of tasks1) 
        {
          for (var item of t.values!)
          {
            this.taskValues.push(item);
          }          
          var tasksField: any;
          let map1 = new Map();
          t.values?.map(c => map1.set(c.field, c.value));
          let map2 = new Map();
          t.values?.map(c => map2.set("typeField", c.type.simple_type));
          const obj1 = Object.fromEntries(map1);
          const obj2 = Object.fromEntries(map2);
          const obj3 =  { id:t.id, text: t.text, start_date: t.start_date, duration: t.duration, progress : t.progress,
            parent: t.parent, type : t.type,  open: t.open, user : t.user, holder: t.holder, planned_start: t.planned_start,
            planned_end: t.planned_end,  project_type_id: t.project_type_id,  priority: t.priority };
          tasksField = {...obj3, ...obj1, ...obj2};  
          tasks.push(tasksField)
         
          
        }        
        links = values[1]; 
        console.log(tasks);
        console.log(tasks1);
        console.log(links);
        
        gantt.parse({tasks,links});
      })
      this.userService.getUsers().subscribe(values => {
        var users: User[];
        users = values;
        gantt.$resourcesStore.parse(users);
      })
    }   
    const dp = gantt.createDataProcessor({
      task:
      {
        update: (data: any) => {
          if (data.id === this.projectUID)
            data.type = "project";
          this.taskService.update(data).subscribe(data => {
            console.log("update",data);
            gantt.refreshData();
            })
          
        },
        create: (data: any) => {
          var id = data.id;
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

interface DynamicType {
  [key: string]: string
}
interface listServer {
  key: string;
  label : string;
}