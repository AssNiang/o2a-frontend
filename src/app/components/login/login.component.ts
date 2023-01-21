import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/shared/services/user.service';
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

        //get user by id
        if (data.id) {
          this._userService.getUserById(data.id).subscribe((user) => {
            LeftSideBarComponent.user_id = data.id;
            if (user.is_specialist) {
              AppComponent.typeUser = LeftSideBarComponent.typeUser =
                'specialist';

              // set user role in the localStorage
              localStorage.setItem('userType', 'specialist')

            } else if (user.is_admin) {
              AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';

              // set user role in the localStorage
              localStorage.setItem('userType', 'admin')

            } else {
              AppComponent.typeUser = LeftSideBarComponent.typeUser =
                'connected';

              // set user role in the localStorage
              localStorage.setItem('userType', 'connected')

            }

          });
          // set token in the localStorage
          localStorage.setItem('token', data.token)

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
