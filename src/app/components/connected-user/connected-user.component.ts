import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-connected-user',
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.css'],
})
export class ConnectedUserComponent implements OnInit {
  userId!: string;
  page_url!: string;

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    console.log(this.userId);
    this.page_url = this.router.url;
    this.userId = this.page_url.split('/')[2];

    this.userId = this.router.url.split('/')[2];


    this._userService.getUserById(this.userId + '').subscribe((user) => {

      // refresh the left-side-bar and the app-component
      LeftSideBarComponent.userId = this.userId;
      if (user.role === 'specialist') {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
      } else if (user.role === 'admin') {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
      } else {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
      }
    });
  }
}
