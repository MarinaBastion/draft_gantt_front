import {  Injectable } from '@angular/core';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrordialogComponent } from '../components/errordialog/errordialog.component';
import { ErrorModel} from  '../interfaces/error/error'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogServiceService {
  public isDialogOpen: Boolean = false;
    constructor(public dialog: MatDialog,private router: Router,private userService: UserService) { }
    openDialog(data:ErrorModel): any {
        if (this.isDialogOpen) {
            return false;
        }
 
        this.isDialogOpen = true;
        const dialogRef = this.dialog.open(ErrordialogComponent, {
            width: '300px',
            data: data
        });
 
        dialogRef.afterClosed().subscribe(result => {
          if (data.status === 440)
          {
            this.userService.logOut();
            this.router.navigate(['login']);
            console.log('error -> navgate to login');
          }
            console.log('The dialog was closed');
            this.isDialogOpen = false;
        });
    }
}
