import { Component, OnInit } from '@angular/core';
import {TREE_CONSTRUCTOR, CnstructorTable,FlatNode} from '../../modules/table-constructor/constants/constant'
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
  selector: 'app-tool-bar-comtainer',
  templateUrl: './tool-bar-comtainer.component.html',
  styleUrls: ['./tool-bar-comtainer.component.css']
})
export class ToolBarComtainerComponent implements OnInit {
  opened = false;
  //constructor_tree: CnstructorTable[] = TREE_CONSTRUCTOR;
  private _transformer = (node: CnstructorTable, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor() {  this.dataSource.data = TREE_CONSTRUCTOR; }
  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
  }

}
