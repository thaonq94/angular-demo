import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideMenus: any = [
    {
      name: 'User',
      route: ['/', 'users'],
    },
    {
      name: 'Task',
      route: ['tasks'],
    },
    {
      name: 'Advertiser',
      route: ['advertiser'],
    }
  ] 
  title = 'angular-demo';
}
