import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon2.jpg';
  public showPassword: boolean = false;
  notValid: boolean = false;
  // userInfos = {};

  constructor(private router: Router, private _userService: UserService) {}

  submit(register: NgForm) {
    if(register.value.password != register.value.passwordConfirmation){
      this.notValid = true;
      return;
    }

    // try {

    // } catch (error) {
    //   console.log(error);
    // }

    this._userService.signUpUser(register.value).subscribe((data) => {

      //register.reset();
      /*
        - add verifications before switching (validators)
        - save infos in the db
      */
      this.router.navigate(['login']);
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}
}
