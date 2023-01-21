import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  userId: string = '';
  signedUsers!: User[];
  specialists!: User[];

  signed: string = '';
  specialist: string = '';
  blocked: string = '';
  blockedUsers: User[] = [];

  constructor(private router: Router, private _userService: UserService, private _adminService: AdminService) { }

  ngOnInit(): void {

    this.userId = this.router.url.split('/')[2];
    // refresh the left-side-bar and the app-component-----> could catch an error if an incorrect userId is given
    this._userService.getUserById(this.userId+'').subscribe(
      user => {
        LeftSideBarComponent.userId = this.userId;
        if(user.role == 'specialist') {
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
        }
        else if(user.role == 'admin'){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
        }
        else{
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
        }
      }
    );

    this._adminService.getUnlockedAccounts().subscribe(users => {
      this.signedUsers = users.filter(user => user.role !== 'admin' && user.role !== 'specialist');
      this.specialists = users.filter(user => user.role == 'specialist');
      //console.log(this.specialists)
    })

    this._adminService.getLockedAccounts().subscribe(users => {
      this.blockedUsers = users;
    })

    this.onSignedUsers();
  }

  onSignedUsers() {
    this.signed = "bg-button-active";
    this.specialist = "";
    this.blocked = "";
  }

  onSpecialists() {
    this.signed = "";
    this.specialist = "bg-button-active";
    this.blocked = "";
  }

  onBlockedUsers() {
    this.signed = "";
    this.specialist = "";
    this.blocked = "bg-button-active";
  }

}
