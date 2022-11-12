import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-structure-location',
  templateUrl: './structure-location.component.html',
  styleUrls: ['./structure-location.component.css']
})
export class StructureLocationComponent implements OnInit {

  user_id: string = '';

  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {

    this.user_id = this.router.url.split('/')[2];
    // refresh the left-side-bar and the app-component-----> could catch an error if an incorrect user_id is given
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
