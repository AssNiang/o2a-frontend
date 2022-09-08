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
  user_id!: String;
  page_url!: String;

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.page_url = this.router.url;
    this.user_id = this.page_url.split('/')[2];

    // refresh the left-side-bar and the app-component
    this._userService.getUserById(this.user_id+'').subscribe(
      user => {
        //console.log("user:", user); // just for test
        LeftSideBarComponent.user_id = this.user_id;
        if(user.is_specialist){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
        }
        else if(user.is_admin){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
        }
        else{
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
        }
      }
    );
  }
}
