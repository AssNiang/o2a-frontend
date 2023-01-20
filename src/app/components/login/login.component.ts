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
  registerIcon: string = '../../../assets/images/register-icon2.png';
  public showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private _userService: UserService) {}

  submit(login: NgForm) {
    try {
      this._userService.signInUser(login.value).subscribe((data) => {
        // console.log(login.value);
        //get user by id
        if (data.id) {
          this._userService.getUserById(data.id).subscribe((user) => {
            LeftSideBarComponent.user_id = data.id;
            if (user.is_specialist) {
              AppComponent.typeUser = LeftSideBarComponent.typeUser =
                'specialist';
            } else if (user.is_admin) {
              AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
            } else {
              AppComponent.typeUser = LeftSideBarComponent.typeUser =
                'connected';
            }
          });

          this.router.navigate(['connected-user', data.id]);
        } else if (data.error) {
          this.errorMessage = data.error;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    //...
  }
}
