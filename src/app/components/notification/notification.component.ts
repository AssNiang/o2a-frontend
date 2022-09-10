import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  user_id!: string;


  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {

    // refresh the left-side-bar and the app-component

    this.user_id = this.router.url.split('/')[2];
    this._userService.getUserById(this.user_id+'').subscribe(
      user => {
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
