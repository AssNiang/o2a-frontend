import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon2.jpg';
  public showPassword: boolean = false;
  // userInfos = {};
  //id = 0;

  constructor(private router: Router, private _userService: UserService) {}

  submit(login: NgForm) {
    // try {

    // } catch (error) {
    //   console.log(error);
    // }

    this._userService.signInUser(login.value).subscribe((data) => {
      //get user by id
      this._userService.getUserById(data.id).subscribe(
        user => {
          //console.log("user:", user); // just for test
          LeftSideBarComponent.user_id = data.id;
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

      //login.reset();

      /*
        - add verifications before switching (user found)
        - get the userId, pass it through the url
        - get the user type to initialize `LeftSideBarComponent.typeUser`
      */

      //LeftSideBarComponent.typeUser = 'admin'; // just for test purposes
      this.router.navigate(['connected-user', data.id]);
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}
}
