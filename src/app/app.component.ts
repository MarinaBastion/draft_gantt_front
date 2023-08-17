import { Component , OnInit , AfterContentChecked} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterContentChecked{
  title = 'gantt_front';
  constructor(private router : Router) { }
  ngOnInit(): void {
    if (!this.isUserAuthenticated()) {
        this.router.navigate(['/login'])
    }
}
ngAfterContentChecked(): void {
//   debugger;
//   console.log('ngAfterContentChecked triggered');
//   if (!this.isUserAuthenticated()) {
//     this.router.navigate(['/login'])
// }
}

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token ){
      return true;
    }
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }

}
