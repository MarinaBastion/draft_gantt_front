import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ErrorModel} from '../../interfaces/error/error'

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {

  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorModel) {}

  ngOnInit(): void {
  }

}
